import React, { useRef } from 'react';
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas';

const EquationDrawer = ({ onSave }: { onSave: (drawing: string) => void }) => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const handleSave = async () => {
    if (!canvasRef.current) return;
    const drawing = await canvasRef.current.exportImage("png");
    onSave(drawing);
  };

  return (
    <div>
      <ReactSketchCanvas
        ref={canvasRef}
        style={{ border: '1px solid black', width: '400px', height: '300px' }}
        strokeWidth={4}
        strokeColor="black"
      />
      <button onClick={handleSave}>Save Equation</button>
    </div>
  );
};

export default EquationDrawer;
