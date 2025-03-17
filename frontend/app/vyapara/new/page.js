'use client'
import { useState } from 'react'
import Image from 'next/image'
import styles from './page.module.css'
import OTPModal from '@/app/components/OTPModal'
import axios from 'axios'

const NewLicenseApplication = () => {
  const [applicants, setApplicants] = useState([{
    licenseNo: '',
    name: '',
    photo: null,
    photoPreview: null,
    fatherName: '',
    phoneNumber: '',
    panNo: '',
    address: '',
    pincode: '', 
  }])

  const [shopDetails, setShopDetails] = useState({
    licenseNo: '',
    shopName: '',
    tradeType: '',
    tradeFees: '',
    shopAddress: '',
    buildingOwnership: '',
    buildingOwnerName: '',
    buildingOwnerPhone: '',
    idProof: null,
    buildingProof: null,
    otherDocuments: [],
  })

  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false)
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState('')
  const [verifiedPhoneNumbers, setVerifiedPhoneNumbers] = useState(new Set())
  const [currentApplicantIndex, setCurrentApplicantIndex] = useState(0)

  const handlePhotoUpload = (index, e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newApplicants = [...applicants]
        newApplicants[index] = {
          ...newApplicants[index],
          photo: file,
          photoPreview: e.target.result
        }
        setApplicants(newApplicants)
      }
      reader.readAsDataURL(file)
    }
  }

  const addApplicant = () => {
    setApplicants([...applicants, {
      licenseNo: '',
      name: '',
      photo: null,
      photoPreview: null,
      fatherName: '',
      phoneNumber: '',
      address: '',
    }])
  }

  const removeApplicant = (index) => {
    const newApplicants = applicants.filter((_, i) => i !== index)
    setApplicants(newApplicants)
  }

  const verifyWhatsapp = async (phoneNumber, index) => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number')
      return
    }
    setCurrentPhoneNumber(phoneNumber)
    setCurrentApplicantIndex(index)
    setIsOTPModalOpen(true)
  }

  const handleVerifyOTP = async (otp) => {
    if (otp === '123456') {
      setVerifiedPhoneNumbers(prev => new Set([...prev, currentPhoneNumber]))
      setIsOTPModalOpen(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    // Append shop details
    formData.append('license_no', shopDetails.licenseNo);
    formData.append('shop_name', shopDetails.shopName);
    formData.append('trade_type', shopDetails.tradeType);
    formData.append('trade_fees', shopDetails.tradeFees);
    formData.append('shop_address', shopDetails.shopAddress);
    formData.append('building_ownership', shopDetails.buildingOwnership);
    formData.append('building_owner_name', shopDetails.buildingOwnerName);
    formData.append('building_owner_phone', shopDetails.buildingOwnerPhone);
    
    // Append documents
    if (shopDetails.idProof) {
        formData.append('id_proof', shopDetails.idProof);
    }
    if (shopDetails.buildingProof) {
        formData.append('building_proof', shopDetails.buildingProof);
    }
    if (shopDetails.otherDocuments.length > 0) {
        shopDetails.otherDocuments.forEach(doc => {
            formData.append('other_documents', doc);
        });
    }

    // Append applicants
    formData.append('applicants', JSON.stringify(applicants));

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/vyapara/licenses/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('License created successfully:', response.data);
        // Handle success (e.g., redirect or show a success message)
    } catch (error) {
        console.error('Error creating license:', error.response.data);
        // Handle error (e.g., show an error message)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>New License Application</h1>
      
      {applicants.map((applicant, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Applicant {index + 1} Details</h2>
            {applicants.length > 1 && (
              <button 
                className={styles.deleteBtn}
                onClick={() => removeApplicant(index)}
              >
                Remove
              </button>
            )}
          </div>

          <form className={styles.form}>
            <div className={styles.formGrid}>
            

              <div className={styles.formGroup}>
                <label htmlFor={`name-${index}`}>Name</label>
                <input
                  id={`name-${index}`}
                  type="text"
                  value={applicant.name}
                  onChange={(e) => {
                    const newApplicants = [...applicants]
                    newApplicants[index].name = e.target.value
                    setApplicants(newApplicants)
                  }}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Photo</label>
                <div className={styles.photoUpload}>
                  {applicant.photoPreview ? (
                    <div className={styles.photoPreview}>
                      <Image
                        src={applicant.photoPreview}
                        alt="Applicant photo"
                        fill
                        className={styles.photo}
                      />
                    </div>
                  ) : (
                    <label className={styles.uploadLabel}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(index, e)}
                        className={styles.fileInput}
                      />
                      <span>Upload Photo</span>
                    </label>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={`fatherName-${index}`}>Father/Husband Name</label>
                <input
                  id={`fatherName-${index}`}
                  type="text"
                  value={applicant.fatherName}
                  onChange={(e) => {
                    const newApplicants = [...applicants]
                    newApplicants[index].fatherName = e.target.value
                    setApplicants(newApplicants)
                  }}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={`phone-${index}`}>Phone Number</label>
                <div className={styles.phoneGroup}>
                  <input
                    id={`phone-${index}`}
                    type="tel"
                    value={applicant.phoneNumber}
                    onChange={(e) => {
                      const newApplicants = [...applicants]
                      newApplicants[index].phoneNumber = e.target.value
                      setApplicants(newApplicants)
                    }}
                    disabled={verifiedPhoneNumbers.has(applicant.phoneNumber)}
                  />
                  {verifiedPhoneNumbers.has(applicant.phoneNumber) ? (
                    <button
                      type="button"
                      className={`${styles.verifyBtn} ${styles.verified}`}
                      disabled
                    >
                      ✓ Verified
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.verifyBtn}
                      onClick={() => verifyWhatsapp(applicant.phoneNumber, index)}
                    >
                      Verify WhatsApp
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={`panNo-${index}`}>PAN NO</label>
                <input
                  id={`pan-${index}`}
                  type="text"
                  value={applicant.panNo}
                  onChange={(e) => {
                    const newApplicants = [...applicants]
                    newApplicants[index].panNo = e.target.value
                    setApplicants(newApplicants)
                  }}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={`pincode-${index}`}>Pin Code</label>
                <input
                  id={`pincode-${index}`}
                  type="number"
                  value={applicant.pincode}
                  onChange={(e) => {
                    const newApplicants = [...applicants]
                    newApplicants[index].pincode = e.target.value
                    setApplicants(newApplicants)
                  }}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor={`address-${index}`}>Address</label>
                <textarea
                  id={`address-${index}`}
                  value={applicant.address}
                  onChange={(e) => {
                    const newApplicants = [...applicants]
                    newApplicants[index].address = e.target.value
                    setApplicants(newApplicants)
                  }}
                />
              </div>
            </div>
          </form>
        </div>
      ))}

      <button 
        type="button"
        className={styles.addBtn}
        onClick={addApplicant}
      >
        Add Another Applicant
      </button>

      <div className={styles.card}>
        <h2>Shop Details</h2>
        <form className={styles.form}>
          <div className={styles.formGrid}>
          <div className={styles.formGroup}>
              <label htmlFor="licenseNo">License Number </label>
              <input
                id="licenseNo"
                type="text"
                value={shopDetails.licenseNo}
                onChange={(e) => setShopDetails({...shopDetails, licenseNo: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="shopName">Shop Name</label>
              <input
                id="shopName"
                type="text"
                value={shopDetails.shopName}
                onChange={(e) => setShopDetails({...shopDetails, shopName: e.target.value})}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="tradeType">Trade Type</label>
              <select
                id="tradeType"
                value={shopDetails.tradeType}
                onChange={(e) => setShopDetails({...shopDetails, tradeType: e.target.value})}
              >
                <option value="">Select Trade Type</option>
                <option value="retail">Retail</option>
                <option value="wholesale">Wholesale</option>
                <option value="services">Services</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="tradeFees">Trade Fees</label>
              <input
                id="tradeFees"
                type="text"
                value={shopDetails.tradeFees}
                disabled
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="shopAddress">Shop Address</label>
              <textarea
                id="shopAddress"
                value={shopDetails.shopAddress}
                onChange={(e) => setShopDetails({...shopDetails, shopAddress: e.target.value})}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="buildingOwnership">Building Ownership</label>
              <select
                id="buildingOwnership"
                value={shopDetails.buildingOwnership}
                onChange={(e) => setShopDetails({...shopDetails, buildingOwnership: e.target.value})}
              >
                <option value="">Select Ownership</option>
                <option value="rent">Rent</option>
                <option value="self">Self Owned</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="buildingOwnerName">Building Owner Name</label>
              <input
                id="buildingOwnerName"
                type="text"
                value={shopDetails.buildingOwnerName}
                onChange={(e) => setShopDetails({...shopDetails, buildingOwnerName: e.target.value})}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="buildingOwnerPhone">Building Owner Phone</label>
              <input
                id="buildingOwnerPhone"
                type="tel"
                value={shopDetails.buildingOwnerPhone}
                onChange={(e) => setShopDetails({...shopDetails, buildingOwnerPhone: e.target.value})}
              />
            </div>


            <div className={styles.formGroup}>
              <label>ID Proof</label>
              <input
                type="file"
                onChange={(e) => setShopDetails({...shopDetails, idProof: e.target.files[0]})}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Building Ownership Proof</label>
              <input
                type="file"
                onChange={(e) => setShopDetails({...shopDetails, buildingProof: e.target.files[0]})}
              />
            </div>

            <div className={styles.formGroup}>
              <label>Other Documents</label>
              <input
                type="file"
                multiple
                onChange={(e) => setShopDetails({...shopDetails, otherDocuments: Array.from(e.target.files)})}
              />
            </div>
          </div>
        </form>
      </div>

      <button 
        type="submit" 
        className={styles.submitBtn}
        onClick={handleSubmit}
      >
        Submit Application
      </button>

      <OTPModal
        isOpen={isOTPModalOpen}
        onClose={() => setIsOTPModalOpen(false)}
        onVerify={handleVerifyOTP}
        title="Verify WhatsApp"
        message={`Enter OTP 123456 to verify ${currentPhoneNumber}`}
      />
    </div>
  )
}

export default NewLicenseApplication
