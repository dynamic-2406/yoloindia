import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Section, { FadeInSection } from '../common/Section';

const AboutIndia = () => (
  <Section className="bg-slate-50">
    <div className="relative max-w-7xl mx-auto rounded-[2rem] bg-white border border-slate-200 p-10 shadow-[0_32px_80px_rgba(15,23,42,0.08)] overflow-hidden">
      <div className="pointer-events-none absolute -right-32 top-24 h-72 w-72 rounded-full bg-saffron-200/40 blur-3xl" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <FadeInSection>
          <div className="rounded-3xl bg-gradient-to-br from-saffron-50 via-amber-50 to-white border border-saffron-100 p-8 shadow-card">
          <div className="mb-8">
            <p className="text-saffron-600 uppercase tracking-[0.24em] text-xs font-semibold mb-3">Trusted Since 2013</p>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore India with confidence
            </h3>
            <p className="font-body text-gray-600 leading-relaxed">
              Personalized India tours for private travelers and small groups, crafted with local insights, seamless logistics and round-the-clock support.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">
              <p className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-3">What makes us different</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
                <li>Adventure, cultural, religious, heritage and wildlife tours</li>
                <li>Custom itineraries designed for your group and budget</li>
                <li>24x7 travel planning, booking and support</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-saffron-600 text-white p-5 shadow-lg">
                <p className="text-xs uppercase tracking-[0.24em] mb-2 text-saffron-100">Awards</p>
                <p className="font-display text-2xl font-bold">2019 & 2025</p>
              </div>
              <div className="rounded-3xl bg-white p-5 border border-slate-200 shadow-sm">
                <p className="text-xs uppercase tracking-[0.24em] mb-2 text-slate-500">Travelers served</p>
                <p className="font-display text-2xl font-bold text-gray-900">100,000+</p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection delay={0.2}>
        <span className="inline-block bg-saffron-50 text-saffron-600 text-xs font-body font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-saffron-200 mb-5">
          About Us
        </span>
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3">
          About Yolo India Tours
        </h2>
        <p className="font-body text-slate-500 mb-8 max-w-2xl">
          Award-winning inbound travel specialists from New Delhi, creating private and small group India tours with expert planning, 24x7 support, and unforgettable local experiences.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="rounded-3xl border border-saffron-100 bg-saffron-50 p-5 shadow-sm">
            <p className="text-saffron-600 font-body text-xs uppercase tracking-wide mb-2">Founded</p>
            <p className="font-display text-2xl font-bold text-gray-900">2013</p>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-slate-500 font-body text-xs uppercase tracking-wide mb-2">Awards</p>
            <p className="font-display text-2xl font-bold text-gray-900">2019 & 2025</p>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <p className="text-slate-500 font-body text-xs uppercase tracking-wide mb-2">Travelers served</p>
            <p className="font-display text-2xl font-bold text-gray-900">100,000+</p>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-10 space-y-6">
          <p className="font-body text-gray-600 leading-relaxed">
            Founded in the year 2013 as yoloindiatours.com, an online travel platform, the company boosted as a private limited in the year 2016 and has emerged as the “Best Upcoming Inbound Tour Operators in India”. It has been awarded in 2019 and 2025 the category of “Excellence in the Tourism Industry” and " Travelers choice awards" by Tripadvisor.
          </p>

        <p className="font-body text-gray-600 leading-relaxed mb-4">
          The New Delhi, based company, with a strong presence in inbound travel trade. The company with its professionally managed travel engine specializes mainly in organizing Adventure, Cultural, Religious, historical, hill station & wildlife tours in India through a sprawling network. It offers 24 X 7 hours services that include travel planning, itinerary design, hotel bookings, ticket reservations and transport facilities. It also provides holiday packages, customized as per client’s need and budget.
        </p>

        <p className="font-body text-gray-600 leading-relaxed mb-4">
          We are the experts of private and small group India tours. We help you to explore Incredible India- the land of mind blowing experiences. From the frozen Himalayas to tropical Kerala, from the sacred Ganges to the sandy Thar Desert, from cities to the villages, from palaces to the huts, from plane to train, from heritage hotels to home stays. Your experience will be beyond your imagination. We understand India is Big and can be a tough country to navigate but we make your life easy by simply telling us what you want to do and our team of specialists will handle all the work so that you can explore, discover and make memories which will stay with you forever. You not only explore the magnificence of this incredible land but also explore the limits of your mind and body.
        </p>        </div>
        <div className="grid gap-6 mb-10">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-3">Why Us?</h3>
            <p className="font-body text-gray-600 leading-relaxed">
              Yolo India Tours is an award winning travel organization and excels with quality services from its experienced staff. Over the years, the company has received positive feedbacks from its existing clients and hence one can expect a cordial reception.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-3">Our Motto</h3>
            <p className="font-body text-gray-600 leading-relaxed mb-3">
              Customer satisfaction: It’s the prime motto of our business, which has helped us to build a good network with travelers from the farthest corners of the world. The company today holds more than 100,000 satisfied travelers and is still framing the travel diaries of fresh clients.
            </p>
            <p className="font-body text-gray-600 leading-relaxed">
              Quality services: Customer satisfaction can only be achieved by quality and time-to time services. Knock us at any hour and from anywhere in the world, we are available. The company tries to give the ultimate satisfaction and luxury depending upon the traveller’s need. Whether you are on a trekking tour in India or tranquil beach holiday, we provide you with a niche and satisfied tour along with certified guides. Further, the travel portal offers a wide range of services and specializes in providing tailor-made holidays and other travel needs to its valuable.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-3">Its portal and services</h3>
            <p className="font-body text-gray-600 leading-relaxed mb-3">
              Yolo India Tours is an online travel platform where determination and commitment has always exceeded travellers’ expectations. The platform provides information regarding all the destinations in India, from the remote lifestyle tucked in the Indian Himalaya to the underwater coral life of Andaman and from the tribes of North East India to the royal heritage of Rajasthan.
            </p>
            <p className="font-body text-gray-600 leading-relaxed">
              We work with all the hotels and resorts in India, from budget to heritage and luxury, as well as it scrolls down to wildlife safari tours, beach holidays, hill station tours, and adventure tours that include trekking, white water river rafting, peak climbing, mountaineering, mountain biking and motor biking. Moreover, keeping in mind the need of leisure travelers, who seek to capture the rich heritage of India, the website also, offers various heritage, cultural and pilgrimage.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-3">About the Services:</h3>
            <p className="font-body text-gray-600 leading-relaxed mb-3">
              Strong associations with budget and luxury hotels across India enables us to give our clients their best value for money. This trait of Yolo India Tours makes it the most attractive tour and travel agency for you. The team is prompt in their replies to your queries, which has earned a reputation as one of the best and most efficient tour and travel operators in India by the clients and overseas partners.
            </p>
            <p className="font-body text-gray-600 leading-relaxed">
              Yolo India Tours offers the following services:
            </p>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-3">What we do “our tours”:</h3>
            <p className="font-body text-gray-600 leading-relaxed">Cultural Tours in India:</p>
            <p className="font-body text-gray-600 leading-relaxed">Heritage Tours</p>
            <p className="font-body text-gray-600 leading-relaxed">Adventure Tours in India:</p>
            <p className="font-body text-gray-600 leading-relaxed">Educational Tour</p>
            <p className="font-body text-gray-600 leading-relaxed">Enlightenment Journeys in India:</p>
            <p className="font-body text-gray-600 leading-relaxed">Recreation Holidays in India:</p>
            <p className="font-body text-gray-600 leading-relaxed">Special Interest Journeys in India:</p>
            <p className="font-body text-gray-600 leading-relaxed">MICE</p>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-3">What we provide:</h3>
            <ul className="list-disc list-inside space-y-2 font-body text-gray-600 leading-relaxed">
              <li>Personalized assistance on arrival & departure.</li>
              <li>All sorts of transfer from car to coach in any city in India.</li>
              <li>Accommodation in all categories of hotels from budget to 5 Star hotels all over India.</li>
              <li>Multilingual guide services.</li>
              <li>Escort services.</li>
              <li>Air, train and bus tickets.</li>
              <li>Sightseeing in comfortable chauffeur driver cars to coaches.</li>
              <li>Special cultural theme events if any</li>
              <li>Local experiences like Cooking class with local family, Yoga classes, Food Walking tours, Market tours etc.</li>
            </ul>
          </div>

          <div>
            <p className="font-body text-gray-600 leading-relaxed mb-3">
              Now you can have a comfortable and hassle free holiday in India where you leave all the worries to us. Right from the arrival at the airport to personalized assistance of departure, we take care of all the needs of the travelers. Our guests just sit back and enjoy their holidays with all the value for the money they have spent.
            </p>
            <p className="font-body text-gray-600 leading-relaxed">
              India is big and full of amazing destinations. It is important not to rush and stuff your India tour itinerary with many places; it can make your trip exhausting. You share your interests with us and we give you a hand to choose the best route for your trip.
            </p>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-3">BUDGETING YOUR TRIP</h3>
            <p className="font-body text-gray-600 leading-relaxed">
              We help you to do the budgeting of your trip. You know about all the expenses which will fall during your travel according to your chosen route during the planning stage of your trip, from accommodation, transport, meals, local experiences, entrance fees, tipping etc. YOU EXACTLY KNOW HOW MUCH WILL BE THE ENTIRE TRIP.
            </p>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-3">WE WILL TAKE CARE OF ALL THE DETAILS OF YOUR TRIP</h3>
            <p className="font-body text-gray-600 leading-relaxed">
              Nobody likes to work during holidays. We are always with you without travelling with you so the work you need to do during your travelling is to relax, enjoy, rejuvenate, experience and make memories and we don’t think you would mind doing this work.
            </p>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-3">SMALL GROUP TOUR WITH ULTIMATE FREEDOM</h3>
            <p className="font-body text-gray-600 leading-relaxed">
              If you are a SOLO traveler and want to travel with like-minded people, our small group tour is for you.
            </p>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-3">TRAVELLING ARRANGEMENTS</h3>
            <p className="font-body text-gray-600 leading-relaxed">
              We are doing all the travelling arrangements according to your travel itinerary, from hotel reservation, transport, local guides, train bookings, Elephant ride, camel ride, Boat ride, overnight camping in the desert, river rafting, Bungee jumping, houseboat etc.
            </p>
          </div>

          <div>
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-3">WE SHOW YOU OUR COUNTRY LIKE FRIENDS NOT TOURIST</h3>
            <p className="font-body text-gray-600 leading-relaxed">
              This is not the sales pitch or to impress you but this is our working style.
            </p>
          </div>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-saffron-500 hover:bg-saffron-600 text-white px-8 py-4 rounded-xl font-body font-semibold transition-all duration-200 shadow-lg shadow-saffron-200"
        >
          Plan Your Custom Trip <ArrowRight size={18} />
        </Link>
      </FadeInSection>
    </div>
  </div>
  </Section>
);

export default AboutIndia;
