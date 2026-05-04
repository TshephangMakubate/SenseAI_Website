import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import bg1 from '../../imports/download_(10).jpg';
import bg2 from '../../imports/download_(1)_(1).jpg';

export function Background() {
  const { scrollY } = useScroll();
  
  // Parallax translation values mapping scroll position (0 to 3000px) to pixel offsets
  const y1 = useTransform(scrollY, [0, 3000], [0, 500]); // Moves down slowly
  const y2 = useTransform(scrollY, [0, 3000], [0, -400]); // Moves up
  const y3 = useTransform(scrollY, [0, 3000], [0, -800]); // Moves up faster

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white">
      {/* Background Image 1 */}
      <div 
        className="absolute inset-0 opacity-[0.05] mix-blend-multiply" 
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Background Image 2 */}
      <div 
        className="absolute inset-0 opacity-[0.05] mix-blend-multiply" 
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.2) rotate(2deg)'
        }}
      />
      
      {/* Brand color blobs for extra modern flair, animated with parallax */}
      <motion.div style={{ y: y1 }} className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-[#EEBBB9] rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></motion.div>
      <motion.div style={{ y: y2 }} className="absolute top-[35%] -left-[10%] w-[50%] h-[50%] bg-[#D22D23] rounded-full mix-blend-multiply filter blur-[140px] opacity-15"></motion.div>
      <motion.div style={{ y: y3 }} className="absolute -bottom-[10%] left-[20%] w-[70%] h-[70%] bg-[#EEBBB9] rounded-full mix-blend-multiply filter blur-[120px] opacity-50"></motion.div>

      {/* Subtle Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      
      {/* Overall wash to ensure it stays white-dominated */}
      <div className="absolute inset-0 bg-white/50"></div>
    </div>
  );
}
