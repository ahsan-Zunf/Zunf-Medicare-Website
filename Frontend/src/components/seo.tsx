import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title?: string;
    description?: string;
    canonicalPath?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonicalPath }) => {
    const location = useLocation();
    
    // 🚀 FIX 1: Removed Netlify garbage, strictly enforced live domain
    const BASE_URL = import.meta.env.VITE_SITE_URL || 'https://zunfmedicare.com'; 

    // 🚀 FIX 2: Sanitize path to absolutely ensure NO trailing slashes anywhere (even on homepage)
    const rawPath = canonicalPath || location.pathname;
    const cleanPath = rawPath === '/' ? '' : rawPath.replace(/\/+$/, "");
    const canonicalUrl = `${BASE_URL}${cleanPath}`;

    return (
        <Helmet>
            {title && <title>{title.includes('Zunf Medicare') ? title : `${title} | Zunf Medicare`}</title>}
            {description && <meta name="description" content={description} />}
            
            {/* Strict Canonical without trailing slash */}
            <link rel="canonical" href={canonicalUrl} />
            
            {/* Dynamic OG URL without trailing slash */}
            <meta property="og:url" content={canonicalUrl} />
        </Helmet>
    );
};