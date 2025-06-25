import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const defaultTemplate =
  "The speaker's tone is {tone}, with a {pitch} pitch and a {rate} delivery. Their volume is {volume}, suggesting that they feel {desc}.";

const emotions = [
  {
    label: 'Anger',
    tone: ['harsh', 'aggressive', 'sharp', 'bitter', 'intense'],
    pitch: ['high', 'piercing', 'tense', 'screechy', 'uneven'],
    rate: ['abrupt', 'forceful', 'confrontational', 'heated', 'rapid'],
    volume: ['firm', 'strong', 'loud', 'elevated', 'roaring'],
    desc: ['furious', 'irritated', 'provoked', 'hostile', 'upset'],
  },
  {
    label: 'Contempt',
    tone: ['mocking', 'sarcastic', 'mean', 'dry', 'rude'],
    pitch: ['flat', 'low', 'dismissive', 'monotone', 'snappy'],
    rate: ['slow', 'steady', 'calm', 'leisurely', 'unhurried'],
    volume: ['hushed', 'reserved', 'controlled', 'understated', 'muffled'],
    desc: ['superior', 'condescending', 'uninterested', 'arrogant'],
  },
  {
    label: 'Disgust',
    tone: ['offensive', 'bitter', 'displeased', 'judgmental', 'irritated'],
    pitch: ['low', 'sharp', 'uneven', 'high', 'raspy'],
    rate: ['reluctant', 'hesitant', 'slow', 'deliberate', 'abrupt'],
    volume: ['suppressed', 'controlled', 'hushed', 'breathy', 'muffled'],
    desc: ['repulsed', 'disturbed', 'offended', 'sickened', 'disapproving'],
  },
  {
    label: 'Fear',
    tone: ['anxious', 'nervous', 'frightened', 'hesitant', 'uncertain'],
    pitch: ['high', 'rising', 'fragile', 'jittery', 'shaky'],
    rate: ['broken', 'uneven', 'fast', 'fragmented', 'rushed'],
    volume: ['soft', 'loud', 'low', 'faint', 'unstable'],
    desc: ['afraid', 'alarmed', 'panicked', 'uneasy', 'stressed'],
  },
  {
    label: 'Sadness',
    tone: ['downcast', 'sorrowful', 'heavy', 'pained', 'melancholic'],
    pitch: ['low', 'falling', 'flat', 'trailing', 'monotone'],
    rate: ['slow', 'dragging', 'hesitant', 'measured'],
    volume: ['quiet', 'hushed', 'gentle', 'soft', 'subdued'],
    desc: ['heartbroken', 'hopeless', 'depressed', 'grieving', 'reflective'],
  },
  {
    label: 'Surprise',
    tone: ['baffled', 'astonished', 'bright', 'excited', 'reactive'],
    pitch: ['high', 'rising', 'sharp', 'squeaky', 'varied'],
    rate: ['fast', 'sudden', 'spontaneous', 'broken', 'moderate'],
    volume: ['crisp', 'medium', 'lifted', 'elevated', 'strong'],
    desc: ['amazed', 'stunned', 'confused', 'startled', 'intrigued', 'shocked'],
  },
  {
    label: 'Happiness',
    tone: ['lively', 'warm', 'enthusiastic', 'passionate', 'playful'],
    pitch: ['medium', 'dynamic', 'steady', 'crisp', 'rising'],
    rate: ['smooth', 'flowing', 'expressive', 'animated', 'fluid'],
    volume: ['moderate', 'clear', 'vibrant', 'bright', 'energized'],
    desc: ['delighted', 'excited', 'cheerful', 'pleased', 'thrilled', 'joyful'],
  },
  {
    label: 'Tenderness',
    tone: ['gentle', 'soft', 'warm', 'soothing', 'caring'],
    pitch: ['low', 'mellow', 'sweet', 'steady', 'even'],
    rate: ['slow', 'flowing', 'calm', 'leisurely', 'patient'],
    volume: ['hushed', 'soft-spoken', 'whispered', 'quiet', 'subdued'],
    desc: ['affectionate', 'sympathetic', 'compassionate', 'kind', 'nurturing'],
  },
  {
    label: 'Calm',
    tone: ['relaxed', 'gentle', 'serene', 'smooth', 'mellow'],
    pitch: ['low', 'even', 'soft', 'moderate', 'flat'],
    rate: ['measured', 'deliberate', 'fluid', 'unhurried'],
    volume: ['light', 'steady', 'quiet', 'balanced', 'hushed'],
    desc: ['peaceful', 'grounded', 'centered', 'composed', 'tranquil'],
  },
  {
    label: 'Neutral',
    tone: ['professional', 'factual', 'authoritative', 'conversational'],
    pitch: ['moderate', 'even', 'monotone'],
    rate: ['measured', 'steady', 'unhurried'],
    volume: ['consistent', 'discreet', 'quiet', 'balanced'],
    desc: ['objective', 'indifferent', 'unbiased', 'impartial'],
  },
];

let preset1 = '',
  preset2 = '',
  preset3 = '',
  preset4 = '',
  preset5 = '',
  preset6 = '',
  preset7 = '',
  preset8 = '',
  preset9 = '',
  preset10 = '';

function Dropdown({ label, options, selected, onChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);
    onChange(value);
  };

  return (
    <div style={{ flex: '1', margin: '0 0.5rem', minWidth: '0' }}>
      <label
        style={{
          display: 'block',
          marginBottom: '0.5rem',
          textAlign: 'center',
        }}
      >
        {label}
      </label>
      <select
        value={selected}
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '0.5rem',
          backgroundColor: '#2d2d2d',
          color: 'white',
          border: '1px solid #444',
          borderRadius: '8px',
        }}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ScrollSelections() {
  const cookieTemplate = Cookies.get('templateValue');
  const [emotionSelection, setEmotionSelection] = useState('');
  const [template, setTemplateValue] = useState(
    cookieTemplate || defaultTemplate
  );
  const [selections, setSelections] = useState({
    tone: '',
    pitch: '',
    rate: '',
    volume: '',
    desc: '',
  });

  //Dropdowns
  const emotionDropdown = (
    <Dropdown
      key="1"
      label="Emotion"
      options={emotions.map((emotion) => emotion.label)}
      selected={emotionSelection.label || ''}
      onChange={(label) => {
        const selected = emotions.find((e) => e.label === label);
        console.log(selected);
        setEmotionSelection(selected || {});
      }}
    />
  );
  const toneDropdown = (
    <Dropdown
      key="2"
      label="Tone"
      selected={selections['tone']}
      options={emotionSelection.tone || []}
      onChange={(value) => handleChange('tone', value)}
    />
  );
  const pitchDropdown = (
    <Dropdown
      key="3"
      label="Pitch"
      selected={selections['pitch']}
      options={emotionSelection.pitch || []}
      onChange={(value) => handleChange('pitch', value)}
    />
  );
  const rateDropdown = (
    <Dropdown
      key="4"
      label="Speech Rate"
      selected={selections['rate']}
      options={emotionSelection.rate || []}
      onChange={(value) => handleChange('rate', value)}
    />
  );
  const volumeDropdown = (
    <Dropdown
      key="5"
      label="Volume"
      selected={selections['volume']}
      options={emotionSelection.volume || []}
      onChange={(value) => handleChange('volume', value)}
    />
  );
  const descDropdown = (
    <Dropdown
      key="6"
      label="Desc"
      selected={selections['desc']}
      options={emotionSelection.desc || []}
      onChange={(value) => handleChange('desc', value)}
    />
  );

  //Adding dropdowns to a list
  const dropdowns = [];
  dropdowns.push(emotionDropdown);
  dropdowns.push(toneDropdown);
  dropdowns.push(pitchDropdown);
  dropdowns.push(rateDropdown);
  dropdowns.push(volumeDropdown);
  dropdowns.push(descDropdown);

  //Generate output with the correct words
  const generateOutput = () => {
    return template
      .replace('{tone}', selections['tone'] || '{tone}')
      .replace('{pitch}', selections['pitch'] || '{pitch}')
      .replace('{rate}', selections['rate'] || '{rate}')
      .replace('{volume}', selections['volume'] || '{volume}')
      .replace('{desc}', selections['desc'] || '{desc}')
      .replace(
        '{emotion}',
        emotionSelection.label?.toLowerCase() || '{emotion}'
      );
  };

  //Handle changes within dropdowns
  const handleChange = (label, value) => {
    setSelections((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  //Update output with selection in dropdowns
  useEffect(() => {
    generateOutput();
  }, [selections]);

  //Copy output to clipboard
  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(generateOutput());
    handleReset();
  };

  //Copy presets to clipboard
  const handleCopyPreset = (value) => {
    navigator.clipboard.writeText(value);
    handleReset();
  };

  const handleReset = () => {
    setSelections({
      tone: '',
      pitch: '',
      rate: '',
      volume: '',
      desc: '',
    });

    setEmotionSelection('');
  };

  //Copy "foreign language" to clipboard
  const handleForeign = () => {
    navigator.clipboard.writeText('Foreign Language');
    handleReset();
  };

  //Save template in cookies
  const saveCookie = (cookieName, value) => {
    Cookies.set(cookieName, value, { expires: 365 }); // Cookie expires in 7 days
    alert(`Saved!`);
  };

  //Save template in cookies
  const resetTemplate = () => {
    setTemplateValue(defaultTemplate);
    Cookies.set('templateValue', defaultTemplate, { expires: 365 }); // Cookie expires in 7 days
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: '#121212',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
        }}
      >
        Desc Gen
      </h2>
      <p style={{ textAlign: 'center', color: '#aaa', marginTop: '2rem' }}>
        Select an emotion and options will appear accordingly
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'nowrap',
          overflowX: 'hidden',
          padding: '0 1rem',
        }}
      >
        {dropdowns}
      </div>
      <p style={{ textAlign: 'center', color: '#aaa', marginTop: '2rem' }}>
        Template
      </p>
      <p style={{ textAlign: 'center', color: '#aaa' }}>
        {
          'Type your desired template using the keywords {tone} {pitch} {rate} {volume}, {desc} and {emotion}. The keywords will be replaced by the selected words above, and the generated sentence will be shown in the output box below.'
        }
      </p>
      <div
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      >
        <input
          type="text"
          value={template}
          onChange={(e) => {
            setTemplateValue(e.target.value);
          }}
          style={{
            width: '80%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#2d2d2d',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '8px',
            marginRight: '1rem',
          }}
        />
        <button
          onClick={() => saveCookie('templateValue', template)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          onClick={resetTemplate}
          style={{
            marginLeft: '1rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
      <p style={{ textAlign: 'center', color: '#aaa', marginTop: '2rem' }}>
        Output
      </p>
      <div
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      >
        <input
          type="text"
          readOnly={true}
          value={generateOutput()}
          style={{
            width: '80%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#2d2d2d',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '8px',
          }}
        />
      </div>
      <div
        style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}
      >
        <button
          disabled={emotionSelection == ''}
          onClick={handleCopyTemplate}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: emotionSelection == '' ? '#1a1a1a' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginRight: '1rem',
          }}
        >
          Copy Output
        </button>
      </div>
      <div
        style={{
          marginTop: '10rem',
          display: 'flex',
          justifyContent: 'left',
        }}
      >
        <button
          onClick={handleForeign}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#a38b1f',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            marginRight: '1rem',
          }}
        >
          Foreign Language
        </button>
      </div>
      <p style={{ color: '#aaa' }}>Copies "Foreign Language" to clipboard</p>

      <h2
        style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
        }}
      >
        Presets
      </h2>
      <p style={{ textAlign: 'center', color: '#aaa', marginTop: '2rem' }}>
        For most used words/templates
      </p>
      {/* Preset 1 */}
      <div
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      >
        <input
          type="text"
          defaultValue={Cookies.get('preset1')}
          onChange={(e) => {
            preset1 = e.target.value;
          }}
          style={{
            width: '80%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#2d2d2d',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '8px',
            marginRight: '1rem',
          }}
        />
        <button
          onClick={() => saveCookie('preset1', preset1)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          onClick={() => handleCopyPreset(preset1)}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Copy
        </button>
      </div>
      {/* Preset 2 */}
      <div
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      >
        <input
          type="text"
          defaultValue={Cookies.get('preset2')}
          onChange={(e) => {
            preset2 = e.target.value;
          }}
          style={{
            width: '80%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#2d2d2d',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '8px',
            marginRight: '1rem',
          }}
        />
        <button
          onClick={() => saveCookie('preset2', preset2)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          onClick={() => handleCopyPreset(preset2)}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Copy
        </button>
      </div>
      {/* Preset 3 */}
      <div
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      >
        <input
          type="text"
          defaultValue={Cookies.get('preset3')}
          onChange={(e) => {
            preset3 = e.target.value;
          }}
          style={{
            width: '80%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#2d2d2d',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '8px',
            marginRight: '1rem',
          }}
        />
        <button
          onClick={() => saveCookie('preset3', preset3)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          onClick={() => handleCopyPreset(preset3)}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Copy
        </button>
      </div>
      {/* Preset 4 */}
      <div
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      >
        <input
          type="text"
          defaultValue={Cookies.get('preset4')}
          onChange={(e) => {
            preset4 = e.target.value;
          }}
          style={{
            width: '80%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#2d2d2d',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '8px',
            marginRight: '1rem',
          }}
        />
        <button
          onClick={() => saveCookie('preset4', preset4)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          onClick={() => handleCopyPreset(preset4)}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Copy
        </button>
      </div>
      {/* Preset 5 */}
      <div
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      >
        <input
          type="text"
          defaultValue={Cookies.get('preset5')}
          onChange={(e) => {
            preset5 = e.target.value;
          }}
          style={{
            width: '80%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#2d2d2d',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '8px',
            marginRight: '1rem',
          }}
        />
        <button
          onClick={() => saveCookie('preset5', preset5)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          onClick={() => handleCopyPreset(preset5)}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Copy
        </button>
      </div>
      {/* Preset 6 */}
      <div
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      >
        <input
          type="text"
          defaultValue={Cookies.get('preset6')}
          onChange={(e) => {
            preset6 = e.target.value;
          }}
          style={{
            width: '80%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#2d2d2d',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '8px',
            marginRight: '1rem',
          }}
        />
        <button
          onClick={() => saveCookie('preset6', preset6)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          onClick={() => handleCopyPreset(preset6)}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Copy
        </button>
      </div>
      {/* Preset 7 */}
      <div
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      >
        <input
          type="text"
          defaultValue={Cookies.get('preset7')}
          onChange={(e) => {
            preset7 = e.target.value;
          }}
          style={{
            width: '80%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#2d2d2d',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '8px',
            marginRight: '1rem',
          }}
        />
        <button
          onClick={() => saveCookie('preset7', preset7)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          onClick={() => handleCopyPreset(preset7)}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Copy
        </button>
      </div>
      {/* Preset 8 */}
      <div
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      >
        <input
          type="text"
          defaultValue={Cookies.get('preset8')}
          onChange={(e) => {
            preset8 = e.target.value;
          }}
          style={{
            width: '80%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#2d2d2d',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '8px',
            marginRight: '1rem',
          }}
        />
        <button
          onClick={() => saveCookie('preset8', preset8)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          onClick={() => handleCopyPreset(preset8)}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Copy
        </button>
      </div>
      {/* Preset 9 */}
      <div
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      >
        <input
          type="text"
          defaultValue={Cookies.get('preset9')}
          onChange={(e) => {
            preset9 = e.target.value;
          }}
          style={{
            width: '80%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#2d2d2d',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '8px',
            marginRight: '1rem',
          }}
        />
        <button
          onClick={() => saveCookie('preset9', preset9)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          onClick={() => handleCopyPreset(preset9)}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Copy
        </button>
      </div>
      {/* Preset 10 */}
      <div
        style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
      >
        <input
          type="text"
          defaultValue={Cookies.get('preset10')}
          onChange={(e) => {
            preset10 = e.target.value;
          }}
          style={{
            width: '80%',
            padding: '0.75rem',
            fontSize: '1rem',
            backgroundColor: '#2d2d2d',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '8px',
            marginRight: '1rem',
          }}
        />
        <button
          onClick={() => saveCookie('preset10', preset10)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
        <button
          onClick={() => handleCopyPreset(preset10)}
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Copy
        </button>
      </div>
    </div>
  );
}
