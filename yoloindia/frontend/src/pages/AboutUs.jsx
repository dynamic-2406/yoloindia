import AboutIndia from '../components/home/AboutIndia';

const AboutUsPage = () => (
  <div className="bg-cream min-h-screen">
    <div className="relative h-56 md:h-64 bg-gradient-to-r from-dark to-saffron-900 flex items-center">
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1600&q=80"
          alt="Travel overview"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 pt-16">
        <p className="font-body text-saffron-400 text-sm mb-2 uppercase tracking-widest">Discover Yolo India</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white">About Us</h1>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-16">
      <AboutIndia />
    </div>
  </div>
);

export default AboutUsPage;
