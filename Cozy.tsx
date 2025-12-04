import React, { useState, useEffect, useRef, useMemo } from 'react';


import './theme.css';

const Cozy = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={className}
        {...props}
      />
));

export default Cozy;