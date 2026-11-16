import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const googleApiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");

    if (!googleApiKey) {
      return new Response(
        JSON.stringify({
          error: "Google Places API key is not configured. Add GOOGLE_PLACES_API_KEY as an edge function secret.",
          reviews: [],
          rating: null,
          totalReviews: 0,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const placeId = url.searchParams.get("place_id");

    if (!placeId) {
      return new Response(
        JSON.stringify({ error: "Missing place_id parameter", reviews: [], rating: null, totalReviews: 0 }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const fields = "reviews,rating,user_ratings_total,name";
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${googleApiKey}&reviews_sort=newest`;

    const googleRes = await fetch(apiUrl);
    const googleData = await googleRes.json();

    if (googleData.status !== "OK") {
      return new Response(
        JSON.stringify({
          error: `Google Places API error: ${googleData.status} - ${googleData.error_message || ""}`,
          reviews: [],
          rating: null,
          totalReviews: 0,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result = googleData.result;
    const reviews = (result.reviews || []).filter((r: any) => r.rating && r.text);
    const rating = result.rating || null;
    const totalReviews = result.user_ratings_total || 0;
    const businessName = result.name || "";

    // Cache reviews in the database
    if (reviews.length > 0) {
      // Clear old cached reviews for this place
      await supabase.from("google_reviews").delete().eq("place_id", placeId);

      // Insert fresh reviews
      const rows = reviews.map((r: any) => ({
        place_id: placeId,
        author_name: r.author_name || "Anonymous",
        rating: r.rating,
        text: r.text || "",
        time: r.time ? new Date(r.time * 1000).toISOString() : null,
        profile_photo_url: r.profile_photo_url || null,
        relative_time_description: r.relative_time_description || null,
        fetched_at: new Date().toISOString(),
      }));

      await supabase.from("google_reviews").insert(rows);
    }

    return new Response(
      JSON.stringify({
        reviews: reviews.map((r: any) => ({
          author_name: r.author_name || "Anonymous",
          rating: r.rating,
          text: r.text || "",
          time: r.time ? new Date(r.time * 1000).toISOString() : null,
          profile_photo_url: r.profile_photo_url || null,
          relative_time_description: r.relative_time_description || null,
        })),
        rating,
        totalReviews,
        businessName,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message, reviews: [], rating: null, totalReviews: 0 }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
