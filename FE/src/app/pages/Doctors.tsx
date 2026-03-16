import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Award, GraduationCap, Calendar, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Doctors() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');

  useEffect(() => {
    // Load doctors from localStorage
    const storedDoctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    setDoctors(storedDoctors);
  }, []);

  const specialties = ['All Specialties', ...Array.from(new Set(doctors.map(d => d.specialty)))];

  const filteredDoctors = selectedSpecialty === 'All Specialties'
    ? doctors
    : doctors.filter(d => d.specialty === selectedSpecialty);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGRvY3RvcnN8ZW58MXx8fHwxNzcyNDkzNDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Our Medical Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl text-white mb-4">Our Medical Team</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Meet our experienced and compassionate healthcare professionals
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-colors"
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-64 overflow-hidden">
                  <ImageWithFallback
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-blue-600 mb-1">{doctor.specialty}</p>
                  <p className="text-sm text-gray-600 mb-4">{doctor.qualifications}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                      <span>{doctor.education}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span>{doctor.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{doctor.rating}/5.0 rating</span>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Doctors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-gray-900 mb-4">Why Choose Our Doctors</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our physicians are leaders in their fields
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Top Medical Schools</h3>
              <p className="text-gray-600">
                Graduates from the nation's most prestigious medical institutions
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Board Certified</h3>
              <p className="text-gray-600">
                All physicians are board-certified in their specialties
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Highly Rated</h3>
              <p className="text-gray-600">
                Consistently receive top ratings from patients for care quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl text-white mb-4">Ready to Meet Your Doctor?</h2>
          <p className="text-xl text-white/90 mb-8">
            Schedule a consultation with one of our expert physicians
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Book an Appointment
          </button>
        </div>
      </section>
    </div>
  );
}