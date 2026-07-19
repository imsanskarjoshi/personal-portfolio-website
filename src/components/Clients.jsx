import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

export default function Clients() {
  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Founder',
      company: 'ApexDesign Studio',
      quote: "Sanskar designed and built our personal finance mobile app using Flutter. The UI is incredibly fluid, and he successfully published it to the Google Play Store on schedule.",
      stars: 5,
      avatar: 'SJ'
    },
    {
      name: 'Alex Rivera',
      role: 'CTO',
      company: 'CloudPulse Analytics',
      quote: "He migrated our core microservices to AWS EKS and established a robust ArgoCD GitOps pipeline. Our deployment cycles went from hours to minutes. A highly skilled DevOps engineer.",
      stars: 5,
      avatar: 'AR'
    },
    {
      name: 'Michael Chang',
      role: 'Product Lead',
      company: 'Zenith Labs',
      quote: "His configuration of Prometheus and Grafana alerts on our Kubernetes cluster saved us from multiple production bottlenecks. His technical skill in Jenkins and Docker automations is exceptional.",
      stars: 5,
      avatar: 'MC'
    }
  ];

  const brandLogos = [
    'CloudPulse', 'ApexDesign', 'ZenithLabs', 'AppForge', 'DevFlow'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
}
