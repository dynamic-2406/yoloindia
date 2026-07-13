import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Section, { SectionHeader, FadeInSection } from '../common/Section';
import DestinationCard from '../destinations/DestinationCard';
import { SkeletonGrid } from '../ui/Skeleton';
import { useFetch } from '../../hooks/useFetch';
import { fetchFeaturedDestinations } from '../../services/api';

const TopDestinations = () => {
  const { data: destinations, loading } = useFetch(fetchFeaturedDestinations);
  return (
    <Section className="bg-white">
      <FadeInSection>
        <SectionHeader badge="Top Destinations" title="Explore Incredible India"
          subtitle="From the golden deserts of Rajasthan to the backwaters of Kerala — discover diverse wonders" />
      </FadeInSection>
      {loading ? <SkeletonGrid count={6} /> : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations?.slice(0, 6).map((dest, i) => (
              <FadeInSection key={dest.id} delay={i * 0.08}>
                <DestinationCard destination={dest} size={i < 2 ? 'lg' : 'md'} />
              </FadeInSection>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/destinations" className="inline-flex items-center gap-2 font-body font-semibold text-saffron-600 hover:text-saffron-700 border-b-2 border-saffron-200 hover:border-saffron-500 pb-0.5 transition-all">
              View All Destinations <ArrowRight size={16} />
            </Link>
          </div>
        </>
      )}
    </Section>
  );
};
export default TopDestinations;
