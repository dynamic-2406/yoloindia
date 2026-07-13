import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase.from('packages').select('title, image_url');
  if (error) {
    console.error("Error fetching packages:", error);
  } else {
    console.log("All Packages in database:");
    data.forEach((pkg, index) => {
      console.log(`${index + 1}. Title: "${pkg.title}" | Image URL: "${pkg.image_url}"`);
    });
  }
}

test();
