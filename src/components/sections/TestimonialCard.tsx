import Link from 'next/link';
import React from 'react';

interface AsidebannerBlockProps {
    testimonialCard?: {
        testimonialDesc?: string;
        testimonialTitle?: string;
        author?: any;
    };
}

const TestimonialCard: React.FC<AsidebannerBlockProps> = ({ testimonialCard }) => {

    console.log(testimonialCard, 'testmonialCard');

    return (
        <div>

        </div>
    );
};

export default TestimonialCard;
