import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Target, Eye, Award, Users, Heart, Lightbulb } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We treat every patient with empathy, respect, and dignity',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest standards in medical care',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work together as a team for better patient outcomes',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace new technologies and medical advances',
    },
  ];

  const milestones = [
    { year: '1996', event: 'Hospital founded with 100 beds' },
    { year: '2005', event: 'Expanded to 300 beds and added ICU wing' },
    { year: '2015', event: 'Introduced robotic surgery center' },
    { year: '2020', event: 'Opened state-of-the-art cardiac center' },
    { year: '2026', event: 'Serving 50,000+ patients annually' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzcyNDg1Mjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="About Modern Hospital"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl text-white mb-4">About Modern Hospital</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            30 years of excellence in providing compassionate, patient-centered healthcare
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-blue-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700">
                To provide exceptional, compassionate healthcare services that improve the health and well-being of our community. We are committed to delivering the highest quality medical care with respect, dignity, and kindness.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl text-gray-900 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-700">
                To be the leading healthcare provider in the region, recognized for medical excellence, innovation, and patient satisfaction. We envision a healthier community where everyone has access to world-class healthcare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                Modern Hospital was founded in 1996 with a vision to provide accessible, high-quality healthcare to our community. What started as a small 100-bed facility has grown into a comprehensive medical center serving over 50,000 patients annually.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Over the past three decades, we have continuously invested in advanced medical technology, recruited top medical talent, and expanded our facilities to meet the growing healthcare needs of our region.
              </p>
              <p className="text-lg text-gray-700">
                Today, we are proud to offer a full spectrum of medical services, from emergency care to specialized treatments, all delivered with the same commitment to excellence and compassion that has defined us from the beginning.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGRvY3RvcnN8ZW58MXx8fHwxNzcyNDkzNDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Our Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <value.icon className="w-10 h-10 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-white mb-4">Our Journey</h2>
            <p className="text-xl text-white/90">Key milestones in our 30-year history</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center">
                <div className="text-3xl text-white mb-3">{milestone.year}</div>
                <p className="text-white/90">{milestone.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl text-gray-900 mb-6">Accreditation & Recognition</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
            Modern Hospital is accredited by the Joint Commission and certified by the American College of Surgeons. We have received numerous awards for patient safety, quality of care, and medical excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-gray-700">Joint Commission Accredited</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-gray-700">Top Hospital Award</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-gray-700">Patient Safety Excellence</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
