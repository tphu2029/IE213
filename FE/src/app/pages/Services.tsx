import { Activity, Heart, Brain, Baby, Bone, Eye, Stethoscope, Syringe, Users, Clock, Award, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Services() {
  const departments = [
    {
      icon: Activity,
      title: 'Emergency Care',
      description: 'Round-the-clock emergency services with a dedicated trauma center and rapid response team.',
      features: ['24/7 Availability', 'Trauma Center Level II', 'Air Ambulance Service', 'Rapid Response Team'],
      image: 'https://images.unsplash.com/photo-1721114989769-0423619f03d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGVtZXJnZW5jeSUyMHJvb218ZW58MXx8fHwxNzcyNDkxNjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      icon: Heart,
      title: 'Cardiology',
      description: 'Comprehensive cardiac care including diagnostics, interventional procedures, and cardiac surgery.',
      features: ['Cardiac Catheterization', 'Pacemaker Implantation', 'Open Heart Surgery', 'Cardiac Rehabilitation'],
      image: 'https://images.unsplash.com/photo-1656337426914-5e5ba162d606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwbGFib3JhdG9yeSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzI1MDgxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      icon: Brain,
      title: 'Neurology',
      description: 'Advanced treatment for brain, spine, and nervous system disorders with cutting-edge technology.',
      features: ['Stroke Center', 'Neurosurgery', 'Epilepsy Treatment', 'Movement Disorders'],
      image: 'https://images.unsplash.com/photo-1725693485717-dbf8eac577c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMHN1cmdlcnklMjBvcGVyYXRpbmclMjByb29tfGVufDF8fHx8MTc3MjQ3MTA3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      icon: Baby,
      title: 'Pediatrics',
      description: 'Specialized care for children from newborns to adolescents with a child-friendly environment.',
      features: ['Neonatal ICU', 'Pediatric Surgery', 'Childhood Vaccinations', 'Growth & Development'],
      image: 'https://images.unsplash.com/photo-1758691463331-2ac00e6f676f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWRpYXRyaWMlMjBkb2N0b3IlMjBjaGlsZHxlbnwxfHx8fDE3NzI1MTM0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      icon: Bone,
      title: 'Orthopedics',
      description: 'Expert care for bones, joints, and muscles including sports medicine and joint replacement.',
      features: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Trauma Care'],
    },
    {
      icon: Eye,
      title: 'Ophthalmology',
      description: 'Complete eye care services including cataract surgery and vision correction procedures.',
      features: ['Cataract Surgery', 'LASIK', 'Retina Care', 'Glaucoma Treatment'],
    },
    {
      icon: Stethoscope,
      title: 'Internal Medicine',
      description: 'Comprehensive care for adult patients with chronic diseases and complex medical conditions.',
      features: ['Diabetes Management', 'Hypertension Care', 'Preventive Medicine', 'Health Screenings'],
    },
    {
      icon: Syringe,
      title: 'Surgery',
      description: 'Advanced surgical procedures including minimally invasive and robotic surgery options.',
      features: ['Robotic Surgery', 'Laparoscopic Surgery', 'General Surgery', 'Surgical ICU'],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGRvY3RvcnN8ZW58MXx8fHwxNzcyNDkzNDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Medical Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-900/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl text-white mb-4">Our Medical Services</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Comprehensive healthcare services delivered with expertise and compassion
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-gray-900 mb-4">Our Departments</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer a full range of medical specialties and subspecialties
            </p>
          </div>
          <div className="space-y-16">
            {departments.map((dept, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      <dept.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-3xl text-gray-900">{dept.title}</h3>
                  </div>
                  <p className="text-lg text-gray-700 mb-6">{dept.description}</p>
                  <div className="space-y-2">
                    {dept.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {dept.image && (
                  <div className={`rounded-xl overflow-hidden shadow-lg ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <ImageWithFallback
                      src={dept.image}
                      alt={dept.title}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                )}
                {!dept.image && (
                  <div className={`bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl p-12 flex items-center justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <dept.icon className="w-32 h-32 text-blue-600 opacity-20" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-white mb-4">Why Choose Our Services</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We combine medical excellence with compassionate care
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl text-white mb-3">Expert Medical Team</h3>
              <p className="text-white/90">
                Board-certified physicians with years of experience in their specialties
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl text-white mb-3">Advanced Technology</h3>
              <p className="text-white/90">
                State-of-the-art medical equipment and innovative treatment options
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl text-white mb-3">24/7 Emergency Care</h3>
              <p className="text-white/90">
                Round-the-clock emergency services with rapid response capabilities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Book an appointment with one of our specialists today
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Schedule an Appointment
          </button>
        </div>
      </section>
    </div>
  );
}
