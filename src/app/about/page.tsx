'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/PrimaryButton';
import { BackgroundAnimation } from '@/components/ui/BackgroundAnimation';
import { InteractiveCard } from '@/components/ui/InteractiveCard';
import { Accordion } from '@/components/ui/Accordion';
import { Timeline } from '@/components/ui/Timeline';

export default function AboutPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      title: "Création Simple",
      description: "Créez votre CV en quelques minutes avec notre interface intuitive",
      icon: "✨",
    },
    {
      title: "Templates Professionnels",
      description: "Choisissez parmi une variété de modèles conçus par des experts",
      icon: "🎨",
    },
    {
      title: "Analyse IA",
      description: "Optimisez votre CV avec notre technologie d'intelligence artificielle",
      icon: "🤖",
    },
  ];

  const team = [
    {
      name: "Sophie Martin",
      role: "CEO & Fondatrice",
      image: "/team/sophie.jpg",
      linkedin: "https://linkedin.com/in/sophie-martin",
    },
    {
      name: "Thomas Bernard",
      role: "CTO",
      image: "/team/thomas.jpg",
      linkedin: "https://linkedin.com/in/thomas-bernard",
    },
    {
      name: "Marie Dubois",
      role: "Lead Designer",
      image: "/team/marie.jpg",
      linkedin: "https://linkedin.com/in/marie-dubois",
    },
  ];

  const testimonials = [
    {
      name: "Jean Dupont",
      role: "Développeur Senior",
      content: "PerfectCV m'a aidé à décrocher mon emploi de rêve. L'analyse IA a vraiment fait la différence !",
      image: "/testimonials/jean.jpg",
    },
    {
      name: "Claire Moreau",
      role: "Marketing Manager",
      content: "Interface intuitive et résultats professionnels. Je recommande vivement !",
      image: "/testimonials/claire.jpg",
    },
  ];

  const stats = [
    { value: "50K+", label: "CVs Créés" },
    { value: "95%", label: "Taux de Satisfaction" },
    { value: "24/7", label: "Support Client" },
  ];

  const faqItems = [
    {
      title: "What makes PerfectCV different?",
      content: "PerfectCV combines AI-powered resume analysis with professional design templates to help you create the perfect CV. Our platform provides real-time feedback and industry-specific recommendations.",
    },
    {
      title: "How does the AI-powered analysis work?",
      content: "Our AI analyzes your resume content, comparing it against successful resumes in your industry. It provides specific recommendations for improvements in content, formatting, and keywords optimization.",
    },
    {
      title: "Can I try PerfectCV for free?",
      content: "Yes! We offer a free tier that includes basic resume creation and formatting. You can upgrade to our Pro or Enterprise plans for advanced features like AI analysis and unlimited exports.",
    },
    {
      title: "How often can I update my resume?",
      content: "You can update your resume as often as you like. We recommend keeping your resume up-to-date and making adjustments based on specific job applications.",
    },
  ];

  const timelineItems = [
    {
      year: "2022",
      title: "PerfectCV Launch",
      description: "PerfectCV was founded with a mission to revolutionize the way people create and manage their professional resumes.",
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Introduced AI-powered resume analysis and recommendations, helping users optimize their resumes for specific industries and roles.",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Expanded our services globally and introduced support for multiple languages and region-specific resume formats.",
    },
  ];

  return (
    <main className="pt-16 bg-white">
      {/* Hero Section avec Animation */}
      <section className="relative bg-gradient-to-br from-violet-600 to-pink-500 text-white py-24 overflow-hidden">
        <BackgroundAnimation />
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600/50 to-pink-500/50" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">À Propos de PerfectCV</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nous aidons les professionnels à créer des CV qui se démarquent et ouvrent de nouvelles opportunités.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">Nos Avantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <InteractiveCard key={index}>
                <div className="p-6 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-violet-900">{feature.title}</h3>
                  <p className="text-violet-600">{feature.description}</p>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 bg-gradient-to-br from-violet-50 to-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <InteractiveCard key={index}>
                <div className="p-6 text-center">
                  <Avatar src={member.image} alt={member.name} className="w-32 h-32 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-1 text-violet-900">{member.name}</h3>
                  <p className="text-violet-600 mb-4">{member.role}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-800 transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={ref} className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 ${
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-violet-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-violet-50 to-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">Ce que disent nos clients</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 ${
                    activeTestimonial === index ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                >
                  <div className="text-center">
                    <Avatar src={testimonial.image} alt={testimonial.name} className="w-20 h-20 mx-auto mb-4" />
                    <p className="text-xl italic mb-4">{testimonial.content}</p>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeTestimonial === index ? 'bg-violet-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">Questions Fréquentes</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gradient-to-br from-violet-50 to-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">Notre Histoire</h2>
          <div className="max-w-4xl mx-auto">
            <Timeline items={timelineItems} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Contactez-nous</h2>
          <p className="text-xl text-gray-600 mb-8">
            Vous avez des questions ? Notre équipe est là pour vous aider.
          </p>
          <Button size="lg">
            Nous Contacter
          </Button>
        </div>
      </section>
    </main>
  );
}
