import { useEffect, useRef, useState } from 'react';

interface ProgressBarProps {
  steps: number;
  currentStep?: number;
  color?: string;
  backgroundColor?: string;
  animate?: boolean;
}

export function ProgressBar({
  steps,
  currentStep = 0,
  color = '#D22D23',
  backgroundColor = '#E5E5E5',
  animate = true
}: ProgressBarProps) {
  const [visibleStep, setVisibleStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) {
      setVisibleStep(currentStep);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [animate, currentStep]);

  useEffect(() => {
    if (!isVisible || !animate) return;

    let step = 0;
    const interval = setInterval(() => {
      if (step <= steps) {
        setVisibleStep(step);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isVisible, steps, animate]);

  const progress = (visibleStep / steps) * 100;

  return (
    <div ref={ref} className="w-full">
      <div className="relative w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor }}>
        <div
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
          }}
        />
      </div>

      {/* Step Indicators */}
      <div className="relative flex justify-between mt-[-5px]">
        {Array.from({ length: steps + 1 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            style={{ marginLeft: index === 0 ? '0' : undefined, marginRight: index === steps ? '0' : undefined }}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index <= visibleStep ? 'scale-100' : 'scale-75'
              }`}
              style={{
                backgroundColor: index <= visibleStep ? color : backgroundColor,
                border: `2px solid ${index <= visibleStep ? color : backgroundColor}`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface ConnectedProgressBarProps {
  steps: { number: string; title: string }[];
  color?: string;
}

export function ConnectedProgressBar({ steps, color = '#D22D23' }: ConnectedProgressBarProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let step = 0;
    const interval = setInterval(() => {
      if (step < steps.length) {
        setActiveStep(step);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isVisible, steps.length]);

  return (
    <div ref={ref} className="relative mb-12">
      <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200">
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{
            width: `${(activeStep / (steps.length - 1)) * 100}%`,
            background: `linear-gradient(90deg, ${color} 0%, #E69E3C 100%)`,
          }}
        />
      </div>

      <div className="relative flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center" style={{ zIndex: 1 }}>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 mb-3 ${
                index <= activeStep ? 'scale-100' : 'scale-75'
              }`}
              style={{
                backgroundColor: index <= activeStep ? color : '#E5E5E5',
                color: index <= activeStep ? 'white' : '#999',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
              }}
            >
              {step.number}
            </div>
            <p className="text-sm text-gray-700 text-center max-w-[120px]" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
              {step.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
