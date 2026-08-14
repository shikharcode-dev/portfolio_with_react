import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { 
  Code2, 
  FileCode2, 
  Terminal,
  Blocks,
  Network,
  Cpu,
  GitBranch,
  Braces,
  Wind,
  FileType
} from 'lucide-react';

const skills = [
  { name: "HTML5", icon: FileCode2 },
  { name: "CSS3", icon: Code2 },
  { name: "JavaScript", icon: Terminal },
  { name: "React", icon: Blocks },
  { name: "Redux Toolkit", icon: Network },
  { name: "Vite", icon: Cpu },
  { name: "Git", icon: GitBranch },
  { name: "GitHub", icon: GitBranch },
  { name: "Python", icon: Braces },
  { name: "Tailwind", icon: Wind },
  { name: "TypeScript", icon: FileType }
];

const ZeroGravitySkills = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const [bodiesData, setBodiesData] = useState([]);

  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
    engineRef.current = engine;
    
    // Zero gravity
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Invisible render to handle bounds and mouse constraints smoothly
    const render = Render.create({
      element: container,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
      }
    });
    
    render.canvas.style.opacity = '0';
    render.canvas.style.position = 'absolute';
    render.canvas.style.zIndex = '10';

    const bodies = [];
    
    const wallOptions = { 
      isStatic: true, 
      render: { visible: false } 
    };
    bodies.push(Bodies.rectangle(width / 2, -50, width, 100, wallOptions));
    bodies.push(Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions));
    bodies.push(Bodies.rectangle(-50, height / 2, 100, height, wallOptions));
    bodies.push(Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions));

    // Generate skill pills using standard for loop
    for (let i = 0; i < skills.length; i++) {
      const skill = skills[i];
      const x = Math.random() * (width - 100) + 50;
      const y = Math.random() * (height - 100) + 50;
      
      const pillWidth = skill.name.length * 10 + 60; // Space for text and icon
      const pillHeight = 44;
      
      const body = Bodies.rectangle(x, y, pillWidth, pillHeight, {
        chamfer: { radius: pillHeight / 2 },
        render: { visible: false },
        restitution: 0.9,
        frictionAir: 0.01,
        plugin: {
          skillData: skill,
          width: pillWidth,
          height: pillHeight
        }
      });
      
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5
      });
      
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
      
      bodies.push(body);
    }

    Composite.add(engine.world, bodies);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Sync body positions to React state for high-quality DOM rendering
    Matter.Events.on(engine, 'afterUpdate', () => {
      const updatedBodies = engine.world.bodies
        .filter(b => b.plugin && b.plugin.skillData)
        .map(b => ({
          id: b.id,
          x: b.position.x,
          y: b.position.y,
          angle: b.angle,
          skillData: b.plugin.skillData,
          width: b.plugin.width,
          height: b.plugin.height
        }));
      setBodiesData(updatedBodies);
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) render.canvas.remove();
      Matter.World.clear(engine.world);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      {/* Big Background Watermark Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <h1 className="text-[5rem] md:text-[7rem] font-black text-white/[0.03] tracking-tighter">
          SKILLS
        </h1>
      </div>
      
      {/* Matter.js Canvas Container */}
      <div ref={sceneRef} className="absolute inset-0 w-full h-full z-10" />
      
      {/* High-quality DOM overlay for icons and text */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {bodiesData.map((body) => {
          const Icon = body.skillData.icon;
          return (
            <div
              key={body.id}
              className="absolute bg-[#1e1b4b] border border-[#6366f1] rounded-full flex items-center justify-center gap-2 px-4 shadow-lg pointer-events-none text-white whitespace-nowrap"
              style={{
                width: body.width,
                height: body.height,
                left: body.x - body.width / 2,
                top: body.y - body.height / 2,
                transform: `rotate(${body.angle}rad)`,
              }}
            >
              <Icon size={18} />
              <span className="font-bold text-sm select-none">{body.skillData.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ZeroGravitySkills;
