import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ToolContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Section = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary);

  @media (max-width: 768px) {
    font-size: 1.35rem;
    margin-bottom: 1.25rem;
  }
`;

const PreviewBox = styled.div`
  width: 100%;
  height: 14rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: var(--primary);
  }

  @media (max-width: 768px) {
    height: 12rem;
  }
`;

const PreviewContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: rgba(153, 161, 175, 0.6);
  pointer-events: none; /* Prevents blocking clicks on the preview box */

  svg {
    width: 3.5rem;
    height: 3.5rem;
    stroke: currentColor;
  }

  p {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
  }
`;

const CurrentColorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  span {
    color: var(--secondary);
  }

  .color-name {
    font-weight: 500;
    color: var(--text-light);
  }
`;

const ColorSwatch = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const ControlsContainer = styled.div`
  margin-top: 2rem;

  @media (max-width: 640px) {
    margin-top: 1.5rem;
  }
`;

const DesktopControls = styled.div`
  display: none;

  @media (min-width: 640px) {
    display: block;
  }
`;

const MobileControls = styled.div`
  display: block;

  @media (min-width: 640px) {
    display: none;
  }
`;

const ControlRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ControlGroup = styled.div`
  flex: 1;
`;

const DimensionControls = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  color: var(--secondary);
  margin-bottom: 0.25rem;
`;

const Select = styled.select`
  width: 100%;
  height: 2.25rem;
  padding: 0 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: var(--text-light);
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    outline: none;
    border-color: var(--primary);
  }

  option {
    background: #1a1a1a;
    color: var(--text-light);
  }
`;

const Input = styled.input`
  width: 100%;
  height: 2.25rem;
  padding: 0 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: var(--text-light);
  font-size: 0.875rem;
  text-align: center;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const DimensionInput = styled(Input)`
  width: 5rem;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const SwapButton = styled.button`
  height: 2.25rem;
  padding: 0 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: var(--text-light);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.25rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--primary);
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const Button = styled.button`
  height: 2.25rem;
  padding: 0 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: var(--text-light);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    border-color: var(--primary);
  }

  @media (max-width: 640px) {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 640px) {
    gap: 0.75rem;
  }
`;

const ColorOption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ColorBox = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: border-color 0.3s ease;

  ${ColorOption}:hover & {
    border-color: var(--primary);
  }

  @media (max-width: 640px) {
    width: 3rem;
    height: 3rem;
  }
`;

const ColorPicker = styled.input`
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
  border: none;
  border-radius: 8px;

  @media (max-width: 640px) {
    width: 3rem;
    height: 3rem;
  }
`;

const ColorLabel = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--secondary);

  @media (max-width: 640px) {
    font-size: 0.8rem;
  }
`;

const Description = styled.p`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--secondary);
  line-height: 1.6;
`;

const LaunchButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem;
  background: var(--primary);
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const FullscreenOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
`;

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
  const [selectedResolution, setSelectedResolution] = useState('1080p');

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

  return (
    <>
      <FullscreenOverlay ref={fullscreenRef} />

      <ToolContainer>
        {/* Live Preview Section */}
        <Section>
          <SectionTitle>Live Preview</SectionTitle>
          <PreviewBox style={{ backgroundColor: currentHex }} onClick={handleFullscreen}>
            <PreviewContent>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
              </svg>
              <p>Click for Fullscreen</p>
            </PreviewContent>
          </PreviewBox>

          <CurrentColorInfo>
            <span>Current:</span>
            <ColorSwatch style={{ backgroundColor: currentHex }} />
            <span className="color-name">{currentName}</span>
            <span>{currentHex}</span>
          </CurrentColorInfo>

          <ControlsContainer>
            <DesktopControls>
              <ControlRow>
                <ControlGroup>
                  <Label>Resolution</Label>
                  <Select onChange={handleResolutionChange} value={selectedResolution}>
                    <optgroup label="Standard">
                      <option value="480p">480p (640×480)</option>
                      <option value="720p">720p (1280×720)</option>
                      <option value="1080p">1080p (1920×1080)</option>
                      <option value="2K">2K (2560×1440)</option>
                      <option value="4K">4K (3840×2160)</option>
                      <option value="8K">8K (7680×4320)</option>
                    </optgroup>
                    <optgroup label="iPhone 16">
                      <option value='iPhone 16 (6.1")'>iPhone 16 (6.1") (1179×2556)</option>
                      <option value='iPhone 16 Plus (6.7")'>iPhone 16 Plus (6.7") (1290×2796)</option>
                      <option value='iPhone 16 Pro (6.3")'>iPhone 16 Pro (6.3") (1206×2622)</option>
                      <option value='iPhone 16 Pro Max (6.9")'>iPhone 16 Pro Max (6.9") (1320×2868)</option>
                    </optgroup>
                    <optgroup label="iPhone 15">
                      <option value='iPhone 15 (6.1")'>iPhone 15 (6.1") (1179×2556)</option>
                      <option value='iPhone 15 Plus (6.7")'>iPhone 15 Plus (6.7") (1290×2796)</option>
                      <option value='iPhone 15 Pro (6.1")'>iPhone 15 Pro (6.1") (1179×2556)</option>
                      <option value='iPhone 15 Pro Max (6.7")'>iPhone 15 Pro Max (6.7") (1290×2796)</option>
                    </optgroup>
                    <optgroup label="iPhone 14">
                      <option value='iPhone 14 (6.1")'>iPhone 14 (6.1") (1170×2532)</option>
                      <option value='iPhone 14 Plus (6.7")'>iPhone 14 Plus (6.7") (1284×2778)</option>
                      <option value='iPhone 14 Pro (6.1")'>iPhone 14 Pro (6.1") (1179×2556)</option>
                      <option value='iPhone 14 Pro Max (6.7")'>iPhone 14 Pro Max (6.7") (1290×2796)</option>
                    </optgroup>
                    <optgroup label="iPad">
                      <option value='iPad (10.9")'>iPad (10.9") (1640×2360)</option>
                      <option value='iPad Pro 11"'>iPad Pro 11" (1668×2388)</option>
                      <option value='iPad Pro 12.9"'>iPad Pro 12.9" (2048×2732)</option>
                    </optgroup>
                  </Select>
                </ControlGroup>
                <DimensionControls>
                  <div>
                    <Label>Width</Label>
                    <DimensionInput
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                      min="1"
                      max="7680"
                    />
                  </div>
                  <SwapButton onClick={handleSwapDimensions} title="Swap width and height">
                    ⇄
                  </SwapButton>
                  <div>
                    <Label>Height</Label>
                    <DimensionInput
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                      min="1"
                      max="4320"
                    />
                  </div>
                </DimensionControls>
                <Button onClick={handleDownload}>Download</Button>
              </ControlRow>
            </DesktopControls>

            <MobileControls>
              <div style={{ marginBottom: '0.5rem' }}>
                <Label>Resolution</Label>
                <Select onChange={handleResolutionChange} value={selectedResolution}>
                  <optgroup label="Standard">
                    <option value="480p">480p (640×480)</option>
                    <option value="720p">720p (1280×720)</option>
                    <option value="1080p">1080p (1920×1080)</option>
                    <option value="2K">2K (2560×1440)</option>
                    <option value="4K">4K (3840×2160)</option>
                    <option value="8K">8K (7680×4320)</option>
                  </optgroup>
                  <optgroup label="iPhone 16">
                    <option value='iPhone 16 (6.1")'>iPhone 16 (6.1") (1179×2556)</option>
                    <option value='iPhone 16 Plus (6.7")'>iPhone 16 Plus (6.7") (1290×2796)</option>
                    <option value='iPhone 16 Pro (6.3")'>iPhone 16 Pro (6.3") (1206×2622)</option>
                    <option value='iPhone 16 Pro Max (6.9")'>iPhone 16 Pro Max (6.9") (1320×2868)</option>
                  </optgroup>
                  <optgroup label="iPhone 15">
                    <option value='iPhone 15 (6.1")'>iPhone 15 (6.1") (1179×2556)</option>
                    <option value='iPhone 15 Plus (6.7")'>iPhone 15 Plus (6.7") (1290×2796)</option>
                    <option value='iPhone 15 Pro (6.1")'>iPhone 15 Pro (6.1") (1179×2556)</option>
                    <option value='iPhone 15 Pro Max (6.7")'>iPhone 15 Pro Max (6.7") (1290×2796)</option>
                  </optgroup>
                  <optgroup label="iPhone 14">
                    <option value='iPhone 14 (6.1")'>iPhone 14 (6.1") (1170×2532)</option>
                    <option value='iPhone 14 Plus (6.7")'>iPhone 14 Plus (6.7") (1284×2778)</option>
                    <option value='iPhone 14 Pro (6.1")'>iPhone 14 Pro (6.1") (1179×2556)</option>
                    <option value='iPhone 14 Pro Max (6.7")'>iPhone 14 Pro Max (6.7") (1290×2796)</option>
                  </optgroup>
                  <optgroup label="iPad">
                    <option value='iPad (10.9")'>iPad (10.9") (1640×2360)</option>
                    <option value='iPad Pro 11"'>iPad Pro 11" (1668×2388)</option>
                    <option value='iPad Pro 12.9"'>iPad Pro 12.9" (2048×2732)</option>
                  </optgroup>
                </Select>
              </div>
              <ControlRow>
                <div style={{ flex: 1 }}>
                  <Label>Width</Label>
                  <Input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                    min="1"
                    max="7680"
                  />
                </div>
                <SwapButton onClick={handleSwapDimensions} title="Swap width and height" style={{ marginTop: '1.5rem' }}>
                  ⇄
                </SwapButton>
                <div style={{ flex: 1 }}>
                  <Label>Height</Label>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                    min="1"
                    max="4320"
                  />
                </div>
              </ControlRow>
              <Button onClick={handleDownload}>Download</Button>
            </MobileControls>
          </ControlsContainer>
        </Section>

        {/* Choose Your Color Section */}
        <Section>
          <SectionTitle>Choose Your Color</SectionTitle>
          <ColorGrid>
            {colors.map((color) => (
              <ColorOption
                key={color.name}
                onClick={() => {
                  setUseCustom(false);
                  setSelectedColor(color);
                }}
              >
                <ColorBox style={{ backgroundColor: color.hex }} />
                <ColorLabel>{color.name}</ColorLabel>
              </ColorOption>
            ))}
            <ColorOption>
              <ColorPicker
                type="color"
                value={customHex}
                onChange={(e) => {
                  setCustomHex(e.target.value);
                  setUseCustom(true);
                }}
              />
              <ColorLabel>Custom</ColorLabel>
            </ColorOption>
          </ColorGrid>
          <Description>
            Perfect for monitor testing, photography lighting, and presentations.
          </Description>
          <LaunchButton onClick={handleFullscreen}>
            Launch {currentName} Screen
          </LaunchButton>
        </Section>
      </ToolContainer>
    </>
  );
}
