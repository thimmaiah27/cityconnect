'use client';
import { useState, useEffect } from 'react';
import FetchLicenseModal from './FetchLicenseModal';
// import UpdateLicense from './[licenseId]/page'; // Adjust the path as necessary
import { useRouter } from 'next/navigation';

export default function UpdateLicensePage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true); // Open modal by default
  const [licenseId, setLicenseId] = useState(null);

  const handleFetch = (id) => {
    setLicenseId(id);
    setIsModalOpen(false); // Close the modal after fetching
  };

  useEffect(() => {
    // Optionally, you can check if there's a licenseId in the URL and close the modal if so
    if (licenseId) {
      setIsModalOpen(false);
    }
  }, [licenseId]);

  return (
    <div>
      <FetchLicenseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onFetch={handleFetch} 
      />
      {licenseId && <UpdateLicense licenseId={licenseId} />}
    </div>
  );
} 