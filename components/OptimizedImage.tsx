/**
 * Optimized Image Component
 * 
 * Wrapper around Next.js Image component with sensible defaults
 * for RecXchange branding and performance.
 * 
 * Features:
 * - Automatic lazy loading
 * - Blur placeholder support
 * - Responsive sizing
 * - Error handling with fallback
 * 
 * Usage:
 * import { OptimizedImage } from '@/components/OptimizedImage';
 * 
 * <OptimizedImage
 *   src="/path/to/image.jpg"
 *   alt="Description"
 *   width={800}
 *   height={600}
 * />
 */

'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { logger } from '@/lib/logger';

interface OptimizedImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallbackSrc?: string;
  showPlaceholder?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.png',
  showPlaceholder = true,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    logger.warn('Image failed to load', { src, alt });
    setHasError(true);
    if (fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Combine wrapper className with image transition classes
  const imageClassName = `${
    isLoading ? 'opacity-0' : 'opacity-100'
  } transition-opacity duration-300`;

  return (
    <div className={`relative ${className}`}>
      {isLoading && showPlaceholder && (
        <div className="absolute inset-0 bg-gray-800/30 animate-pulse rounded-lg" />
      )}
      
      <Image
        {...props}
        src={imgSrc}
        alt={alt}
        className={imageClassName}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        quality={90}
      />
      
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
          <div className="text-center text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Optimized Avatar Component
 * Specialized for user avatars with consistent sizing
 */
interface OptimizedAvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function OptimizedAvatar({
  src,
  alt,
  size = 'md',
  className = '',
}: OptimizedAvatarProps) {
  const sizes = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  };

  const dimension = sizes[size];

  return (
    <OptimizedImage
      src={src || '/images/default-avatar.png'}
      alt={alt}
      width={dimension}
      height={dimension}
      className={`rounded-full ${className}`}
      showPlaceholder={false}
    />
  );
}

/**
 * Optimized Logo Component
 * Specialized for RecXchange logos
 */
interface OptimizedLogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

export function OptimizedLogo({
  variant = 'full',
  className = '',
}: OptimizedLogoProps) {
  const logos = {
    full: {
      src: 'https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w',
      width: 200,
      height: 60,
      alt: 'RecXchange Logo',
    },
    icon: {
      src: 'https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png',
      width: 64,
      height: 64,
      alt: 'RecXchange Icon',
    },
  };

  const logo = logos[variant];

  return (
    <OptimizedImage
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      className={className}
      priority // Logos are above fold, load immediately
      showPlaceholder={false}
    />
  );
}
