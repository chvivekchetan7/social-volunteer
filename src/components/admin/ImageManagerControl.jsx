import React, { useState, useRef, useEffect } from 'react';
import { Upload, Link as LinkIcon, Trash2, RefreshCw, X, AlertCircle, Image as ImageIcon, CheckCircle, FileText, Info } from 'lucide-react';

export default function ImageManagerControl({
  value,
  onChange,
  label = 'Photo',
  aspectRatio = '16/9',
  height = '180px',
  onRemove,
  showToast,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'url'
  const [urlInput, setUrlInput] = useState('');
  const [pendingImage, setPendingImage] = useState(null);
  const [fileMeta, setFileMeta] = useState(null); // { fileName, fileSize, dimensions, format }
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [currentDimensions, setCurrentDimensions] = useState(null);
  const fileInputRef = useRef(null);

  // Read dimensions of current active image
  useEffect(() => {
    if (value) {
      const img = new Image();
      img.onload = () => {
        setCurrentDimensions(`${img.naturalWidth} × ${img.naturalHeight} px`);
      };
      img.src = value;
    } else {
      setCurrentDimensions(null);
    }
  }, [value]);

  const openModal = () => {
    setErrorMsg('');
    setPendingImage(value || '');
    setUrlInput(value && value.startsWith('http') ? value : '');
    setFileMeta(null);
    setActiveTab(value && value.startsWith('http') ? 'url' : 'upload');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPendingImage(null);
    setFileMeta(null);
    setErrorMsg('');
  };

  const handleFileSelect = (file) => {
    setErrorMsg('');
    if (!file) return;

    // Format validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    const isValidExtension = ['jpg', 'jpeg', 'png', 'webp'].includes(extension || '');

    if (!validTypes.includes(file.type.toLowerCase()) && !isValidExtension) {
      setErrorMsg('Invalid file format. Only JPG, JPEG, PNG, and WEBP files are allowed.');
      return;
    }

    // Size validation (Max 5MB)
    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrorMsg(`File too large (${(file.size / (1024 * 1024)).toFixed(2)}MB). Maximum allowed size is 5MB.`);
      return;
    }

    setLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const img = new Image();
      img.onload = () => {
        setPendingImage(dataUrl);
        setFileMeta({
          fileName: file.name,
          fileSize: `${(file.size / 1024).toFixed(1)} KB`,
          format: file.type.split('/')[1]?.toUpperCase() || extension?.toUpperCase() || 'IMAGE',
          dimensions: `${img.naturalWidth} × ${img.naturalHeight} px`,
        });
        setLoading(false);
      };
      img.onerror = () => {
        setErrorMsg('Uploaded file appears corrupted or unreadable.');
        setLoading(false);
      };
      img.src = dataUrl;
    };

    reader.onerror = () => {
      setErrorMsg('Failed to read local file. Please try again.');
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUrlChange = (urlVal) => {
    setUrlInput(urlVal);
    setErrorMsg('');
    if (!urlVal.trim()) {
      setPendingImage('');
      setFileMeta(null);
      return;
    }
    const cleanUrl = urlVal.trim();
    setPendingImage(cleanUrl);
    setFileMeta({
      fileName: cleanUrl.split('/').pop()?.split('?')[0] || 'External Image',
      fileSize: 'External URL',
      format: 'URL',
      dimensions: 'Dynamic',
    });
  };

  const handleSave = () => {
    if (!pendingImage) {
      setErrorMsg('Please select a photo or enter a valid Image URL before saving.');
      return;
    }
    onChange(pendingImage);
    if (showToast) {
      showToast('Image replaced successfully.', 'success');
    }
    closeModal();
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    } else {
      onChange('');
    }
    if (showToast) {
      showToast('Image removed successfully.', 'info');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 750, color: '#374151' }}>
          {label}
        </label>
        {value && currentDimensions && (
          <span style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: 600 }}>
            {currentDimensions}
          </span>
        )}
      </div>

      {/* Surface Preview Box */}
      <div
        style={{
          border: '1px solid #E5E7EB',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '1.25rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}
      >
        {value ? (
          <div>
            {/* Image display */}
            <div
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                height: height,
                width: '100%',
                position: 'relative',
                border: '1px solid #E5E7EB',
                backgroundColor: '#F9FAFB',
                marginBottom: '1rem',
              }}
            >
              <img
                src={value}
                alt={label}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  background: 'rgba(17, 24, 39, 0.85)',
                  color: '#FFFFFF',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backdropFilter: 'blur(4px)',
                }}
              >
                Current Photo
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={openModal}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: 'var(--brand-orange)',
                  color: '#FFFFFF',
                  fontWeight: 750,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(232, 90, 42, 0.25)',
                  transition: 'all 0.2s ease',
                }}
              >
                <RefreshCw size={15} />
                <span>Replace Photo</span>
              </button>

              <button
                type="button"
                onClick={handleRemove}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.65rem 1.1rem',
                  borderRadius: '20px',
                  border: '1px solid #FCA5A5',
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Trash2 size={15} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div style={{ textAlign: 'center', padding: '1.25rem 0' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(232, 90, 42, 0.1)',
                color: 'var(--brand-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem',
              }}
            >
              <ImageIcon size={24} />
            </div>
            <div style={{ fontWeight: 750, fontSize: '0.95rem', color: '#111827', marginBottom: '0.25rem' }}>
              No photo selected
            </div>
            <p style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '1rem' }}>
              Add a high-resolution photo for {label.toLowerCase()}.
            </p>

            <button
              type="button"
              onClick={openModal}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1.4rem',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: 'var(--brand-orange)',
                color: '#FFFFFF',
                fontWeight: 750,
                fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(232, 90, 42, 0.3)',
              }}
            >
              <Upload size={16} />
              <span>Add Photo</span>
            </button>
          </div>
        )}
      </div>

      {/* PRO IMAGE MANAGER MODAL */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(17, 24, 39, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              maxWidth: '560px',
              width: '100%',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              animation: 'modalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                  Manage {label}
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 600 }}>
                  Upload a photo from your computer or use an image URL.
                </span>
              </div>
              <button
                type="button"
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6B7280',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '50%',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Error Message */}
              {errorMsg && (
                <div
                  style={{
                    backgroundColor: '#FEE2E2',
                    color: '#DC2626',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: 650,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    border: '1px solid #FCA5A5',
                  }}
                >
                  <AlertCircle size={17} style={{ flexShrink: 0 }} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Mode Tabs */}
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#F3F4F6',
                  padding: '4px',
                  borderRadius: '12px',
                }}
              >
                <button
                  type="button"
                  onClick={() => { setActiveTab('upload'); setErrorMsg(''); }}
                  style={{
                    flex: 1,
                    padding: '0.55rem',
                    borderRadius: '9px',
                    border: 'none',
                    backgroundColor: activeTab === 'upload' ? '#FFFFFF' : 'transparent',
                    color: activeTab === 'upload' ? 'var(--brand-orange)' : '#6B7280',
                    fontWeight: 750,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    boxShadow: activeTab === 'upload' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  <Upload size={15} />
                  <span>Upload from Computer</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('url'); setErrorMsg(''); }}
                  style={{
                    flex: 1,
                    padding: '0.55rem',
                    borderRadius: '9px',
                    border: 'none',
                    backgroundColor: activeTab === 'url' ? '#FFFFFF' : 'transparent',
                    color: activeTab === 'url' ? 'var(--brand-orange)' : '#6B7280',
                    fontWeight: 750,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    boxShadow: activeTab === 'url' ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  <LinkIcon size={15} />
                  <span>Image URL</span>
                </button>
              </div>

              {/* Tab 1: Upload */}
              {activeTab === 'upload' && (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    style={{ display: 'none' }}
                    onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                  />

                  <div
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    style={{
                      border: isDragOver ? '2px dashed var(--brand-orange)' : '2px dashed #D1D5DB',
                      backgroundColor: isDragOver ? 'rgba(232, 90, 42, 0.05)' : '#F9FAFB',
                      borderRadius: '14px',
                      padding: '2rem 1.5rem',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Upload size={36} style={{ color: 'var(--brand-orange)', margin: '0 auto 0.6rem' }} />
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#111827', marginBottom: '0.2rem' }}>
                      {loading ? 'Reading & Optimizing Image...' : 'Click to Upload or Drag & Drop'}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                      Supported formats: JPG, JPEG, PNG, WEBP (Max 5MB)
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: URL */}
              {activeTab === 'url' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#374151' }}>
                    Paste External Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={urlInput}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      borderRadius: '10px',
                      border: '1px solid #D1D5DB',
                      fontSize: '0.9rem',
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                    Tip: Direct HTTPS links from Unsplash, Pexels, or Cloudinary work best.
                  </span>
                </div>
              )}

              {/* Selected Image Preview & File Meta */}
              {pendingImage && (
                <div
                  style={{
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    backgroundColor: '#F9FAFB',
                    padding: '1rem',
                  }}
                >
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#374151', marginBottom: '0.6rem' }}>
                    SELECTED IMAGE PREVIEW (UNSAVED DRAFT)
                  </div>
                  <div
                    style={{
                      borderRadius: '10px',
                      overflow: 'hidden',
                      height: '160px',
                      width: '100%',
                      backgroundColor: '#E5E7EB',
                      marginBottom: '0.75rem',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={pendingImage}
                      alt="Selected preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={() => setErrorMsg('Unable to render image preview from specified source.')}
                    />
                  </div>

                  {fileMeta && (
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#6B7280', flexWrap: 'wrap' }}>
                      <div><strong style={{ color: '#374151' }}>File:</strong> {fileMeta.fileName}</div>
                      <div><strong style={{ color: '#374151' }}>Size:</strong> {fileMeta.fileSize}</div>
                      <div><strong style={{ color: '#374151' }}>Format:</strong> {fileMeta.format}</div>
                      {fileMeta.dimensions && <div><strong style={{ color: '#374151' }}>Resolution:</strong> {fileMeta.dimensions}</div>}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid #E5E7EB',
                backgroundColor: '#F9FAFB',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.75rem',
              }}
            >
              <button
                type="button"
                onClick={closeModal}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '20px',
                  border: '1px solid #D1D5DB',
                  backgroundColor: '#FFFFFF',
                  color: '#374151',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: '20px',
                  border: 'none',
                  backgroundColor: 'var(--brand-orange)',
                  color: '#FFFFFF',
                  fontWeight: 750,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(232, 90, 42, 0.3)',
                }}
              >
                Save Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
