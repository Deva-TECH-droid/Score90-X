'use client';

import Image from 'next/image';
import React from 'react';
import { StaticImageData } from 'next/image';
 
interface BannerProps {
  title: string;
  subtitle?: string;
  image: string | StaticImageData;
  height?: string;
  overlay?: boolean;
  children?: React.ReactNode;
}

export default function Banner({
  title,
  subtitle,
  image,
  height = 'h-[500px]',
  overlay = true,
  children,
}: BannerProps) {
  return (
    <section className={`relative w-full overflow-hidden ${height}`}>
      {/* Background Image */}

      <Image
        src={image}
        alt={title}
        fill
        priority
        className="object-cover rounded-xl"
      />

      {/* Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-black/45" />
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-5xl text-center text-white">
          <h1 className="text-4xl font-bold md:text-6xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 text-base text-gray-200 md:text-xl">
              {subtitle}
            </p>
          )}

          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}