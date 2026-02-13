import React from 'react';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    let variantClass = 'btn-primary';
    if (variant === 'secondary') variantClass = 'btn-secondary';
    if (variant === 'ghost') variantClass = 'btn-ghost';
    if (variant === 'danger') variantClass = 'btn-danger';
    if (variant === 'outline') variantClass = 'btn-outline';

    let sizeClass = '';
    if (size === 'sm') sizeClass = 'btn-sm';
    if (size === 'icon') sizeClass = 'btn-icon';

    return (
        <button
            className={`btn ${variantClass} ${sizeClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
