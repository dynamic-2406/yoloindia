import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://efqmdyjvmjeoxitmtwjo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmcW1keWp2bWplb3hpdG10d2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NDM2NzAsImV4cCI6MjA5NjIxOTY3MH0.UOkcwglvy0OVZAxmAt0vWVAoMtdv8YCT7KZnk0yIBdU';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspect() {
  console.log("=== INSPECTING SUPABASE DATABASE ===");
  
  // 1. Fetch packages
  const { data: packages, error: pkgError } = await supabase
    .from('packages')
    .select('*');
    
  if (pkgError) {
    console.error("Error fetching packages:", pkgError);
  } else {
    console.log(`\nTotal Packages: ${packages.length}`);
    
    // Check duplicates by slug or title
    const seenSlugs = {};
    const duplicatePackages = [];
    
    packages.forEach(p => {
      if (seenSlugs[p.slug]) {
        duplicatePackages.push(p);
      } else {
        seenSlugs[p.slug] = p.id;
      }
    });
    
    console.log(`Found ${duplicatePackages.length} duplicate package slug(s):`);
    duplicatePackages.forEach(p => {
      console.log(`- Slug: "${p.slug}", Title: "${p.title}", ID: "${p.id}"`);
    });
    
    console.log("\nSample packages data (first 3):");
    packages.slice(0, 3).forEach(p => {
      console.log(JSON.stringify(p, null, 2));
    });
  }

  // 2. Fetch destinations
  const { data: destinations, error: destError } = await supabase
    .from('destinations')
    .select('*');
    
  if (destError) {
    console.error("Error fetching destinations:", destError);
  } else {
    console.log(`\nTotal Destinations: ${destinations.length}`);
    
    const seenDestSlugs = {};
    const duplicateDestinations = [];
    destinations.forEach(d => {
      if (seenDestSlugs[d.slug]) {
        duplicateDestinations.push(d);
      } else {
        seenDestSlugs[d.slug] = d.id;
      }
    });
    
    console.log(`Found ${duplicateDestinations.length} duplicate destination slug(s):`);
    duplicateDestinations.forEach(d => {
      console.log(`- Slug: "${d.slug}", Name: "${d.name}", ID: "${d.id}"`);
    });
    
    console.log("\nSample destinations data (first 3):");
    destinations.slice(0, 3).forEach(d => {
      console.log(JSON.stringify(d, null, 2));
    });
  }
}

inspect();