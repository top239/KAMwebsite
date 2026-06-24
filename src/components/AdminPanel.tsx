import { useState, useEffect, useRef, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import {
  LogOut, Plus, Trash2, Car, Loader2, CheckCircle, AlertCircle, X, Eye, EyeOff, Upload, Link, Pencil
} from 'lucide-react';

interface CarListing {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  transmission: string;
  fuel_type: string;
  description: string | null;
  image_url: string | null;
  status: 'available' | 'sold';
  created_at: string;
}

type FormData = {
  make: string;
  model: string;
  year: number;
  price: string;
  mileage: string;
  color: string;
  transmission: string;
  fuel_type: string;
  description: string;
  image_url: string;
  status: 'available' | 'sold';
};

const emptyForm: FormData = {
  make: '',
  model: '',
  year: new Date().getFullYear(),
  price: '',
  mileage: '',
  color: '',
  transmission: 'Automatic',
  fuel_type: 'Gasoline',
  description: '',
  image_url: '',
  status: 'available',
};

function carToForm(car: CarListing): FormData {
  return {
    make: car.make,
    model: car.model,
    year: car.year,
    price: String(car.price),
    mileage: String(car.mileage),
    color: car.color,
    transmission: car.transmission,
    fuel_type: car.fuel_type,
    description: car.description ?? '',
    image_url: car.image_url ?? '',
    status: car.status,
  };
}

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-white text-sm font-medium transition-all ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
      {type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
      {message}
      <button onClick={onClose} className="ml-1 opacity-70 hover:opacity-100"><X className="w-4 h-4" /></button>
    </div>
  );
}

function LoginForm({ onLogin }: { onLogin: (user: User) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else if (data.user) {
      onLogin(data.user);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
            <Car className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">KAM Auto Admin</h1>
            <p className="text-sm text-slate-500">Sign in to manage listings</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-11 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [cars, setCars] = useState<CarListing[]>([]);
  const [carsLoading, setCarsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [imageMode, setImageMode] = useState<'upload' | 'url'>('upload');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setAuthChecked(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) fetchCars();
  }, [user]);

  async function fetchCars() {
    setCarsLoading(true);
    const { data, error } = await supabase
      .from('car_listings')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setCars(data ?? []);
    setCarsLoading(false);
  }

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setImageMode('upload');
    setUploadFile(null);
    setUploadPreview(null);
    setShowForm(true);
  }

  function openEdit(car: CarListing) {
    setEditingId(car.id);
    setForm(carToForm(car));
    setUploadFile(null);
    setUploadPreview(null);
    if (car.image_url) {
      setImageMode('url');
    } else {
      setImageMode('upload');
    }
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setUploadFile(null);
    setUploadPreview(null);
  }

  async function handleSubmitCar(e: FormEvent) {
    e.preventDefault();
    setFormLoading(true);

    let imageUrl = form.image_url || null;

    if (imageMode === 'upload' && uploadFile) {
      setUploading(true);
      const ext = uploadFile.name.split('.').pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from('car-images')
        .upload(path, uploadFile, { upsert: false });
      setUploading(false);
      if (uploadError) {
        setToast({ message: 'Image upload failed: ' + uploadError.message, type: 'error' });
        setFormLoading(false);
        return;
      }
      const { data: urlData } = supabase.storage.from('car-images').getPublicUrl(path);
      imageUrl = urlData.publicUrl;
    }

    const payload = {
      make: form.make,
      model: form.model,
      year: Number(form.year),
      price: Number(form.price),
      mileage: Number(form.mileage),
      color: form.color,
      transmission: form.transmission,
      fuel_type: form.fuel_type,
      description: form.description || null,
      image_url: imageUrl,
      status: form.status,
    };

    if (editingId) {
      const { error } = await supabase.from('car_listings').update(payload).eq('id', editingId);
      if (error) {
        setToast({ message: 'Failed to update car: ' + error.message, type: 'error' });
      } else {
        setToast({ message: 'Car updated successfully!', type: 'success' });
        closeForm();
        fetchCars();
      }
    } else {
      const { error } = await supabase.from('car_listings').insert(payload);
      if (error) {
        setToast({ message: 'Failed to add car: ' + error.message, type: 'error' });
      } else {
        setToast({ message: 'Car added successfully!', type: 'success' });
        closeForm();
        fetchCars();
      }
    }

    setFormLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    setDeletingId(id);
    const { error } = await supabase.from('car_listings').delete().eq('id', id);
    if (error) {
      setToast({ message: 'Failed to delete: ' + error.message, type: 'error' });
    } else {
      setToast({ message: 'Listing deleted.', type: 'success' });
      setCars((prev) => prev.filter((c) => c.id !== id));
    }
    setDeletingId(null);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-lg">KAM Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 hidden sm:block">{user.email}</span>
            <a href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">View Site</a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page title + add button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Car Listings</h2>
            <p className="text-slate-500 text-sm mt-0.5">{cars.length} listing{cars.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-md"
          >
            <Plus className="w-5 h-5" />
            <span>Add Car</span>
          </button>
        </div>

        {/* Add / Edit Car Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                  {editingId ? 'Edit Car' : 'Add New Car'}
                </h3>
                <button onClick={closeForm} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitCar} className="p-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Make *">
                    <input required value={form.make} onChange={(e) => setForm({ ...form, make: e.target.value })} placeholder="e.g. Toyota" className={inputCls} />
                  </Field>
                  <Field label="Model *">
                    <input required value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="e.g. Camry" className={inputCls} />
                  </Field>
                  <Field label="Year *">
                    <input required type="number" min={1980} max={2030} value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} className={inputCls} />
                  </Field>
                  <Field label="Price ($) *">
                    <input required type="number" min={0} step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="e.g. 15000" className={inputCls} />
                  </Field>
                  <Field label="Mileage (km) *">
                    <input required type="number" min={0} value={form.mileage} onChange={(e) => setForm({ ...form, mileage: e.target.value })} placeholder="e.g. 60000" className={inputCls} />
                  </Field>
                  <Field label="Color *">
                    <input required value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} placeholder="e.g. Silver" className={inputCls} />
                  </Field>
                  <Field label="Transmission *">
                    <select value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })} className={inputCls}>
                      <option>Automatic</option>
                      <option>Manual</option>
                    </select>
                  </Field>
                  <Field label="Fuel Type *">
                    <select value={form.fuel_type} onChange={(e) => setForm({ ...form, fuel_type: e.target.value })} className={inputCls}>
                      <option>Gasoline</option>
                      <option>Diesel</option>
                      <option>Electric</option>
                      <option>Hybrid</option>
                    </select>
                  </Field>
                  <Field label="Status">
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'available' | 'sold' })} className={inputCls}>
                      <option value="available">Available</option>
                      <option value="sold">Sold</option>
                    </select>
                  </Field>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-slate-700">Photo</label>
                    <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
                      <button
                        type="button"
                        onClick={() => { setImageMode('upload'); setUploadFile(null); setUploadPreview(null); }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${imageMode === 'upload' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        <Upload className="w-3.5 h-3.5" />
                        Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => { setImageMode('url'); setUploadFile(null); setUploadPreview(null); }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${imageMode === 'url' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        <Link className="w-3.5 h-3.5" />
                        URL
                      </button>
                    </div>
                  </div>

                  {imageMode === 'upload' ? (
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadFile(file);
                          setUploadPreview(URL.createObjectURL(file));
                        }}
                      />
                      {uploadPreview ? (
                        <div className="relative rounded-xl overflow-hidden h-40 bg-slate-100">
                          <img src={uploadPreview} alt="preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => { setUploadFile(null); setUploadPreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full border-2 border-dashed border-slate-300 hover:border-orange-400 rounded-xl p-8 flex flex-col items-center gap-2 text-slate-400 hover:text-orange-500 transition-all"
                        >
                          <Upload className="w-8 h-8" />
                          <span className="text-sm font-medium">Click to upload a photo</span>
                          <span className="text-xs">JPG, PNG, WEBP up to 10MB</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div>
                      <input
                        value={form.image_url}
                        onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                        placeholder="https://..."
                        className={inputCls}
                      />
                      {form.image_url && (
                        <div className="rounded-xl overflow-hidden h-40 bg-slate-100 mt-2">
                          <img src={form.image_url} alt="preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Field label="Description">
                  <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Vehicle details, features, condition..." className={`${inputCls} resize-none`} />
                </Field>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeForm} className="flex-1 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={formLoading || uploading} className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-semibold transition-colors flex items-center justify-center gap-2">
                    {(formLoading || uploading) ? <Loader2 className="w-5 h-5 animate-spin" /> : editingId ? <Pencil className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {uploading ? 'Uploading...' : formLoading ? (editingId ? 'Saving...' : 'Adding...') : editingId ? 'Save Changes' : 'Add Car'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cars table */}
        {carsLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
          </div>
        ) : cars.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
            <Car className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">No listings yet. Add your first car above.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Photo</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Vehicle</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Price</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden md:table-cell">Mileage</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 hidden lg:table-cell">Details</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cars.map((car) => (
                    <tr key={car.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        {car.image_url ? (
                          <img src={car.image_url} alt="" className="w-16 h-11 object-cover rounded-lg bg-slate-100" />
                        ) : (
                          <div className="w-16 h-11 rounded-lg bg-slate-100 flex items-center justify-center">
                            <Car className="w-5 h-5 text-slate-300" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-slate-900">{car.year} {car.make} {car.model}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{car.color}</p>
                      </td>
                      <td className="px-4 py-3 font-bold text-orange-500">
                        ${car.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-slate-600 hidden md:table-cell">
                        {car.mileage.toLocaleString()} km
                      </td>
                      <td className="px-4 py-3 text-slate-500 hidden lg:table-cell">
                        {car.transmission} · {car.fuel_type}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${car.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                          {car.status === 'available' ? 'Available' : 'Sold'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEdit(car)}
                            className="text-slate-400 hover:text-blue-600 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
                            title="Edit listing"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(car.id)}
                            disabled={deletingId === car.id}
                            className="text-slate-400 hover:text-red-500 disabled:opacity-40 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                            title="Delete listing"
                          >
                            {deletingId === car.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const inputCls = 'w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm bg-white';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
