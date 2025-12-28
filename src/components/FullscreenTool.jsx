"use client";

import { useState, useRef, useEffect } from 'react';

export default function FullscreenTool() {
  const colors = [
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Black', hex: '#000000' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Green', hex: '#00FF00' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Cyan', hex: '#00FFFF' },
    { name: 'Gray', hex: '#808080' },
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [customHex, setCustomHex] = useState('#FFFFFF');
  const [useCustom, setUseCustom] = useState(false);

  const currentHex = useCustom ? customHex : selectedColor.hex;
  const currentName = useCustom ? 'Custom' : selectedColor.name;

  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [selectedResolution, setSelectedResolution] = useState('1080p'); // Default to 1080p

  const resolutions = {
    '480p': { w: 640, h: 480 },
    '720p': { w: 1280, h: 720 },
    '1080p': { w: 1920, h: 1080 },
    '2K': { w: 2560, h: 1440 },
    '4K': { w: 3840, h: 2160 },
    '8K': { w: 7680, h: 4320 },
    'iPhone 16 (6.1")': { w: 1179, h: 2556 },
    'iPhone 16 Plus (6.7")': { w: 1290, h: 2796 },
    'iPhone 16 Pro (6.3")': { w: 1206, h: 2622 },
    'iPhone 16 Pro Max (6.9")': { w: 1320, h: 2868 },
    'iPhone 15 (6.1")': { w: 1179, h: 2556 },
    'iPhone 15 Plus (6.7")': { w: 1290, h: 2796 },
    'iPhone 15 Pro (6.1")': { w: 1179, h: 2556 },
    'iPhone 15 Pro Max (6.7")': { w: 1290, h: 2796 },
    'iPhone 14 (6.1")': { w: 1170, h: 2532 },
    'iPhone 14 Plus (6.7")': { w: 1284, h: 2778 },
    'iPhone 14 Pro (6.1")': { w: 1179, h: 2556 },
    'iPhone 14 Pro Max (6.7")': { w: 1290, h: 2796 },
    'iPad (10.9")': { w: 1640, h: 2360 },
    'iPad Pro 11"': { w: 1668, h: 2388 },
    'iPad Pro 12.9"': { w: 2048, h: 2732 },
  };

  const fullscreenRef = useRef(null);

  const handleFullscreen = () => {
    if (fullscreenRef.current) {
      fullscreenRef.current.style.backgroundColor = currentHex;
      fullscreenRef.current.style.display = 'block';
      fullscreenRef.current.requestFullscreen().catch(err => console.error(err));
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && fullscreenRef.current) {
        fullscreenRef.current.style.display = 'none';
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = currentHex;
      ctx.fillRect(0, 0, width, height);
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentName.toLowerCase()}-screen-${width}x${height}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleResolutionChange = (e) => {
    const resolution = e.target.value;
    setSelectedResolution(resolution);
    const dims = resolutions[resolution];
    if (dims) {
      setWidth(dims.w);
      setHeight(dims.h);
    }
  };

  const handleSwapDimensions = () => {
    const newWidth = height;
    const newHeight = width;
    setWidth(newWidth);
    setHeight(newHeight);
  };

  const isLightColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  };

  return (
    <>
      {/* Fullscreen Overlay Div */}
      <div
        ref={fullscreenRef}
        style={{
          display: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
        }}
      ></div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 p-4">
        {/* Live Preview Section */}
        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
          <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
          <div
            className="w-full h-56 flex items-center justify-center text-center cursor-pointer border border-gray-300 rounded"
            style={{ backgroundColor: currentHex }}
            onClick={handleFullscreen}
          >
            <div class="text-center text-gray-400">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor h-8 w-8 mx-auto mb-2" aria-hidden="true">
				<rect width="20" height="14" x="2" y="3" rx="2"></rect>
				<line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line>
				</svg>
				<p class="text-sm font-medium">Click for Fullscreen</p>
			</div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm mt-4 mb-4">
            <span className="text-gray-500">Current:</span>
            <div
              className="w-4 h-4 rounded border border-gray-300"
              style={{ backgroundColor: currentHex }}
            ></div>
            <span className="font-medium text-gray-900">{currentName}</span>
            <span className="text-gray-500">{currentHex}</span>
          </div>
          <div className="mt-8">
            <div className="hidden sm:block">
              <div className="flex items-end gap-1 sm:gap-2">
                <div className="flex-1">
                  <label className="label">
                    <span className="label-text text-xs text-base-content/70">Resolution</span>
                  </label>
                  <select
                    className="select select-bordered w-full h-9 min-h-9 border border-gray-300 rounded"
                    onChange={handleResolutionChange}
                    value={selectedResolution}
                  >
                    <optgroup label="Standard">
                      <option value="480p">480p (640×480)</option>
                      <option value="720p">720p (1280×720)</option>
                      <option value="1080p" selected="">1080p (1920×1080)</option>
                      <option value="2K">2K (2560×1440)</option>
                      <option value="4K">4K (3840×2160)</option>
                      <option value="8K">8K (7680×4320)</option>
                    </optgroup>
                    <optgroup label="iPhone 16">
                      <option value="iPhone 16 (6.1&quot;)">iPhone 16 (6.1&quot;) (1179×2556)</option>
                      <option value="iPhone 16 Plus (6.7&quot;)">iPhone 16 Plus (6.7&quot;) (1290×2796)</option>
                      <option value="iPhone 16 Pro (6.3&quot;)">iPhone 16 Pro (6.3&quot;) (1206×2622)</option>
                      <option value="iPhone 16 Pro Max (6.9&quot;)">iPhone 16 Pro Max (6.9&quot;) (1320×2868)</option>
                    </optgroup>
                    <optgroup label="iPhone 15">
                      <option value="iPhone 15 (6.1&quot;)">iPhone 15 (6.1&quot;) (1179×2556)</option>
                      <option value="iPhone 15 Plus (6.7&quot;)">iPhone 15 Plus (6.7&quot;) (1290×2796)</option>
                      <option value="iPhone 15 Pro (6.1&quot;)">iPhone 15 Pro (6.1&quot;) (1179×2556)</option>
                      <option value="iPhone 15 Pro Max (6.7&quot;)">iPhone 15 Pro Max (6.7&quot;) (1290×2796)</option>
                    </optgroup>
                    <optgroup label="iPhone 14">
                      <option value="iPhone 14 (6.1&quot;)">iPhone 14 (6.1&quot;) (1170×2532)</option>
                      <option value="iPhone 14 Plus (6.7&quot;)">iPhone 14 Plus (6.7&quot;) (1284×2778)</option>
                      <option value="iPhone 14 Pro (6.1&quot;)">iPhone 14 Pro (6.1&quot;) (1179×2556)</option>
                      <option value="iPhone 14 Pro Max (6.7&quot;)">iPhone 14 Pro Max (6.7&quot;) (1290×2796)</option>
                    </optgroup>
                    <optgroup label="iPad">
                      <option value="iPad (10.9&quot;)">iPad (10.9&quot;) (1640×2360)</option>
                      <option value="iPad Pro 11&quot;">iPad Pro 11&quot; (1668×2388)</option>
                      <option value="iPad Pro 12.9&quot;">iPad Pro 12.9&quot; (2048×2732)</option>
                    </optgroup>
                  </select>
                </div>
                <div className="flex items-end gap-1 sm:gap-2">
                  <div className="w-16 sm:w-20">
                    <label className="label">
                      <span className="label-text text-xs text-base-content/70">Width</span>
                    </label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                      className="input input-bordered w-full h-9 min-h-9 text-sm text-center border border-gray-300 rounded"
                      min="1"
                      max="7680"
                    />
                  </div>
                  <button
                    className="btn btn-outline h-9 min-h-9 px-2 border border-gray-300 rounded"
                    title="Swap width and height"
                    onClick={handleSwapDimensions}
                  >
                    ⇄
                  </button>
                  <div className="w-16 sm:w-20">
                    <label className="label">
                      <span className="label-text text-xs text-base-content/70">Height</span>
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                      className="input input-bordered w-full h-9 min-h-9 text-sm text-center border border-gray-300 rounded"
                      min="1"
                      max="4320"
                    />
                  </div>
                </div>
                <button
                  onClick={handleDownload}
                  className="btn h-9 min-h-9 px-2 sm:px-3 mt-2 sm:mt-0 rounded bg-black text-white hover:bg-gray-800"
                >
                  Download
                </button>
              </div>
            </div>
            {/* Mobile Layout */}
            <div className="sm:hidden flex flex-col gap-2">
              <div>
                <label className="label">
                  <span className="label-text text-xs text-base-content/70">Resolution</span>
                </label>
                <select
                  className="select select-bordered w-full h-9 min-h-9 border border-gray-300 rounded"
                  onChange={handleResolutionChange}
                  value={selectedResolution}
                >
                  <optgroup label="Standard">
                    <option value="480p">480p (640×480)</option>
                    <option value="720p">720p (1280×720)</option>
                    <option value="1080p" selected="">1080p (1920×1080)</option>
                    <option value="2K">2K (2560×1440)</option>
                    <option value="4K">4K (3840×2160)</option>
                    <option value="8K">8K (7680×4320)</option>
                  </optgroup>
                  <optgroup label="iPhone 16">
                    <option value="iPhone 16 (6.1&quot;)">iPhone 16 (6.1&quot;) (1179×2556)</option>
                    <option value="iPhone 16 Plus (6.7&quot;)">iPhone 16 Plus (6.7&quot;) (1290×2796)</option>
                    <option value="iPhone 16 Pro (6.3&quot;)">iPhone 16 Pro (6.3&quot;) (1206×2622)</option>
                    <option value="iPhone 16 Pro Max (6.9&quot;)">iPhone 16 Pro Max (6.9&quot;) (1320×2868)</option>
                  </optgroup>
                  <optgroup label="iPhone 15">
                    <option value="iPhone 15 (6.1&quot;)">iPhone 15 (6.1&quot;) (1179×2556)</option>
                    <option value="iPhone 15 Plus (6.7&quot;)">iPhone 15 Plus (6.7&quot;) (1290×2796)</option>
                    <option value="iPhone 15 Pro (6.1&quot;)">iPhone 15 Pro (6.1&quot;) (1179×2556)</option>
                    <option value="iPhone 15 Pro Max (6.7&quot;)">iPhone 15 Pro Max (6.7&quot;) (1290×2796)</option>
                  </optgroup>
                  <optgroup label="iPhone 14">
                    <option value="iPhone 14 (6.1&quot;)">iPhone 14 (6.1&quot;) (1170×2532)</option>
                    <option value="iPhone 14 Plus (6.7&quot;)">iPhone 14 Plus (6.7&quot;) (1284×2778)</option>
                    <option value="iPhone 14 Pro (6.1&quot;)">iPhone 14 Pro (6.1&quot;) (1179×2556)</option>
                    <option value="iPhone 14 Pro Max (6.7&quot;)">iPhone 14 Pro Max (6.7&quot;) (1290×2796)</option>
                  </optgroup>
                  <optgroup label="iPad">
                    <option value="iPad (10.9&quot;)">iPad (10.9&quot;) (1640×2360)</option>
                    <option value="iPad Pro 11&quot;">iPad Pro 11&quot; (1668×2388)</option>
                    <option value="iPad Pro 12.9&quot;">iPad Pro 12.9&quot; (2048×2732)</option>
                  </optgroup>
                </select>
              </div>
              <div className="flex items-end gap-1">
                <div className="w-1/2">
                  <label className="label">
                    <span className="label-text text-xs text-base-content/70">Width</span>
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                    className="input input-bordered w-full h-9 min-h-9 text-sm text-center border border-gray-300 rounded"
                    min="1"
                    max="7680"
                  />
                </div>
                <button
                  className="btn btn-outline h-9 min-h-9 px-2 border border-gray-300 rounded"
                  title="Swap width and height"
                  onClick={handleSwapDimensions}
                >
                  ⇄
                </button>
                <div className="w-1/2">
                  <label className="label">
                    <span className="label-text text-xs text-base-content/70">Height</span>
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                    className="input input-bordered w-full h-9 min-h-9 text-sm text-center border border-gray-300 rounded"
                    min="1"
                    max="4320"
                  />
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="btn w-full h-9 min-h-9 px-2 sm:px-3 mt-2 bg-black text-white hover:bg-gray-800"
              >
                Download
              </button>
            </div>
          </div>
        </div>

        {/* Choose Your Color Section */}
        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
          <h2 className="text-2xl font-semibold mb-4">Choose Your Color</h2>
          <div className="grid grid-cols-4 gap-4">
            {colors.map((color) => (
              <div
                key={color.name}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  setUseCustom(false);
                  setSelectedColor(color);
                }}
              >
                <div className="w-14 h-14 rounded border border-gray-300" style={{ backgroundColor: color.hex }}></div>
                <p className="mt-1 text-sm">{color.name}</p>
              </div>
            ))}
            <div className="flex flex-col items-center">
              <input
                type="color"
                value={customHex}
                onChange={(e) => {
                  setCustomHex(e.target.value);
                  setUseCustom(true);
                }}
                className="w-14 h-14 cursor-pointer"
              />
              <p className="mt-1 text-sm">Custom</p>
            </div>
          </div>
          <p className="mt-6 text-center text-sm">
            Perfect for monitor testing, photography lighting, and presentations.
          </p>
          <button
            onClick={handleFullscreen}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Launch {currentName} Screen
          </button>
        </div>
      </div>
    </>
  );
}
