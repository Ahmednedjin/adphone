import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/integrations/supabase/types';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
}

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

export interface Phone {
  id?: string;
  brand: string;
  model: string;
  specs: Record<string, any>;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export async function phoneExists(brand: string, model: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('phones')
      .select('id')
      .eq('brand', brand)
      .eq('model', model)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error('[DB] Error checking phone existence:', error);
    return false;
  }
}

export async function insertPhone(phone: Phone): Promise<void> {
  try {
    const { error } = await supabase
      .from('phones')
      .insert({
        brand: phone.brand,
        model: phone.model,
        specs: phone.specs,
        image_url: phone.imageUrl,
      });

    if (error) throw error;
  } catch (error) {
    console.error('[DB] Error inserting phone:', error);
    throw error;
  }
}

export async function getAllPhones(filter?: { brand?: string; model?: string }): Promise<Phone[]> {
  try {
    let query = supabase.from('phones').select('*');

    if (filter?.brand) {
      query = query.ilike('brand', `%${filter.brand}%`);
    }
    if (filter?.model) {
      query = query.ilike('model', `%${filter.model}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('[DB] Error getting phones:', error);
    return [];
  }
}

export async function getPhoneById(id: string): Promise<Phone | null> {
  try {
    const { data, error } = await supabase
      .from('phones')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data || null;
  } catch (error) {
    console.error('[DB] Error getting phone by id:', error);
    return null;
  }
}

export async function updatePhone(id: string, updates: Partial<Phone>): Promise<void> {
  try {
    const { error } = await supabase
      .from('phones')
      .update({
        brand: updates.brand,
        model: updates.model,
        specs: updates.specs,
        image_url: updates.imageUrl,
      })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('[DB] Error updating phone:', error);
    throw error;
  }
}

export async function deletePhone(id: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('phones')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('[DB] Error deleting phone:', error);
    throw error;
  }
}
