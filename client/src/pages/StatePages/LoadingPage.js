import React from 'react'

export default function LoadingPage() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only spinner"></span>
      </div>
    </div>
  );
}
