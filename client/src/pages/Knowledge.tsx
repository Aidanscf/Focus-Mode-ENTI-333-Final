import KnowledgeArticleCard from "@/components/KnowledgeArticleCard";
import { Eye, Wind, MessageSquare, Target, Brain, Music } from "lucide-react";

export const knowledgeArticles = [
  {
    id: "visualization",
    title: "Visualization and Imagery",
    description: "This technique involves mentally picturing successful performance or specific sports scenarios in vivid detail. By simulating real events in the mind, athletes effectively 'practice' their skills and game plans.",
    icon: Eye,
    gradient: "bg-gradient-to-br from-blue-500 to-purple-600",
    content: `
      <p class="text-lg leading-relaxed mb-6">This technique involves mentally picturing successful performance or specific sports scenarios in vivid detail. By simulating real events in the mind, athletes effectively "practice" their skills and game plans, which helps manage stress and build confidence.</p>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">How It Works</h2>
      <p class="leading-relaxed mb-4">Imagery works by activating neural pathways similar to actual physical execution, enhancing muscle memory and readiness. When you visualize a movement or scenario, your brain activates many of the same neural circuits as when you physically perform the action.</p>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">Key Research</h2>
      <p class="leading-relaxed mb-4">Sport psychologists widely recognize visualization as one of the most effective mental training tools. Studies have shown that athletes who combine physical practice with mental imagery show greater improvement than those who rely on physical practice alone.</p>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">Practical Application</h2>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li>Find a quiet space and close your eyes</li>
        <li>Create a vivid mental movie of yourself performing at your best</li>
        <li>Engage all senses - see, feel, hear, and even smell your environment</li>
        <li>Practice regularly for 10-15 minutes daily</li>
        <li>Always visualize successful outcomes with specific details</li>
      </ul>

      <p class="leading-relaxed">Your FocusMode routine incorporates guided visualization to help you arrive at competition mentally ready and confident.</p>
    `
  },
  {
    id: "breathing",
    title: "Breathing and Relaxation Exercises",
    description: "Techniques such as deep diaphragmatic breathing, progressive muscle relaxation, and mindfulness meditation help athletes control their arousal level before competition.",
    icon: Wind,
    gradient: "bg-gradient-to-br from-teal-500 to-green-600",
    content: `
      <p class="text-lg leading-relaxed mb-6">Techniques such as deep diaphragmatic breathing, progressive muscle relaxation, and mindfulness meditation help athletes control their arousal level before competition.</p>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">The Science Behind It</h2>
      <p class="leading-relaxed mb-4">Slow, controlled breathing activates the parasympathetic nervous system (the "calming" side of our physiology), which lowers heart rate and anxiety, creating a centered, focused state. By reducing the physical symptoms of stress, these techniques free the mind to concentrate on performance.</p>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">Key Techniques</h2>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li><strong>Diaphragmatic Breathing:</strong> Breathe deeply into your belly rather than shallow chest breathing</li>
        <li><strong>Box Breathing:</strong> Inhale for 4 counts, hold for 4, exhale for 4, hold for 4</li>
        <li><strong>Progressive Muscle Relaxation:</strong> Systematically tense and release muscle groups</li>
        <li><strong>Mindfulness Meditation:</strong> Focus on present-moment awareness without judgment</li>
      </ul>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">When to Use</h2>
      <p class="leading-relaxed mb-4">These techniques are particularly effective in the 30-60 minutes before competition, helping you achieve optimal arousal levels - alert but not anxious, relaxed but not sluggish.</p>

      <p class="leading-relaxed">Your FocusMode routine includes breathing cues with specific timing guidance to help you enter this optimal state.</p>
    `
  },
  {
    id: "self-talk",
    title: "Cue Words and Pre-Performance Self-Talk",
    description: "This refers to deliberately using positive self-talk or short cue words to guide one's mindset before and during performance.",
    icon: MessageSquare,
    gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
    content: `
      <p class="text-lg leading-relaxed mb-6">This refers to deliberately using positive self-talk or short, cue words to guide one's mindset before and during performance. Athletes might repeat phrases like "smooth and strong" or "focus now" to themselves as they warm up or execute a skill.</p>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">How It Works</h2>
      <p class="leading-relaxed mb-4">Such self-directed talk helps channel attention toward the task (and away from distractions or negative thoughts) while boosting self-confidence. The simplicity of cue words makes them easy to recall under pressure, serving as mental anchors that trigger practiced responses.</p>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">Types of Self-Talk</h2>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li><strong>Instructional:</strong> Technical reminders ("Follow through," "Stay low")</li>
        <li><strong>Motivational:</strong> Confidence boosters ("I've got this," "Strong and ready")</li>
        <li><strong>Focus cues:</strong> Attention directors ("Here, now," "This moment")</li>
      </ul>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">Creating Your Mantra</h2>
      <p class="leading-relaxed mb-4">The most effective cue words are personal and meaningful to you. They should be:</p>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li>Short (3-5 words maximum)</li>
        <li>Positive in framing</li>
        <li>Action-oriented or emotionally resonant</li>
        <li>Practiced until automatic</li>
      </ul>

      <p class="leading-relaxed">Your FocusMode routine generates a personalized mantra based on your profile and match context.</p>
    `
  },
  {
    id: "routines",
    title: "Pre-Match Routines and Rituals",
    description: "Many athletes follow a set pre-performance routine - a sequence of behaviors or mini-rituals done in the minutes or day leading up to competition.",
    icon: Target,
    gradient: "bg-gradient-to-br from-indigo-500 to-blue-600",
    content: `
      <p class="text-lg leading-relaxed mb-6">Many athletes follow a set pre-performance routine – a sequence of behaviors or mini-rituals done in the minutes or day leading up to competition. This might include things like putting on gear in a certain order, doing a specific warm-up sequence, listening to a favorite song, or visualization at a set time.</p>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">Why Routines Work</h2>
      <p class="leading-relaxed mb-4">Pre-match routines provide consistency and emotional regulation. They act as a mental anchor, helping athletes enter an optimal mindset regardless of external circumstances. When the environment is unpredictable (new venue, tough opponent, high stakes), the routine remains a constant.</p>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">Benefits of Pre-Match Routines</h2>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li>Reduce anxiety by creating familiarity</li>
        <li>Signal to the brain that it's time to perform</li>
        <li>Prevent overthinking by keeping the mind occupied</li>
        <li>Build confidence through consistent preparation</li>
        <li>Create a sense of control in uncontrollable situations</li>
      </ul>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">Building Your Routine</h2>
      <p class="leading-relaxed mb-4">Effective routines are personal and practiced. Start with 3-4 elements that feel meaningful to you, and perform them consistently before every competition until they become automatic.</p>

      <p class="leading-relaxed">FocusMode helps you build a structured 10-minute mental preparation routine that you can use consistently before every match.</p>
    `
  },
  {
    id: "mental-rehearsal",
    title: "Mental Rehearsal and Focus Scripts",
    description: "This technique involves running through an entire performance or sequence mentally, often using a scripted outline of cues - a 'focus script.'",
    icon: Brain,
    gradient: "bg-gradient-to-br from-pink-500 to-red-600",
    content: `
      <p class="text-lg leading-relaxed mb-6">This technique is closely related to visualization, but generally refers to running through an entire performance or sequence mentally, often using a scripted outline of cues – a "focus script." For example, before a gymnastics routine or a race, an athlete might mentally rehearse each segment (sometimes listening to a recorded script guiding them through the visualized performance).</p>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">How It Works</h2>
      <p class="leading-relaxed mb-4">Mental rehearsal engages the brain's planning and execution systems, priming the athlete for optimal performance. By going through the performance step-by-step mentally, athletes strengthen the neural pathways required for execution while identifying potential challenges before they arise.</p>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">Focus Script Components</h2>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li><strong>Pre-performance setup:</strong> Getting into position, breathing, mental state</li>
        <li><strong>Key phases:</strong> Breaking performance into manageable segments</li>
        <li><strong>Transition points:</strong> Moments between phases requiring attention</li>
        <li><strong>Technical cues:</strong> Specific reminders for execution</li>
        <li><strong>Emotional anchors:</strong> Feelings of confidence and control</li>
      </ul>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">Audio-Guided Rehearsal</h2>
      <p class="leading-relaxed mb-4">Many elite athletes use audio recordings to guide their mental rehearsal, allowing them to close their eyes and be led through the visualization without having to remember every step.</p>

      <p class="leading-relaxed">FocusMode generates a personalized 10-minute guided meditation script and converts it to audio, so you can close your eyes and be guided through your pre-match mental rehearsal.</p>
    `
  },
  {
    id: "priming",
    title: "Short-Term Priming Techniques",
    description: "Quick interventions used immediately before performance to prime an optimal mental state, including music, scent, and power poses.",
    icon: Music,
    gradient: "bg-gradient-to-br from-yellow-500 to-orange-600",
    content: `
      <p class="text-lg leading-relaxed mb-6">These are quick interventions used immediately before performance to prime an optimal mental state. They include listening to energizing music, exposure to certain scents, or adopting power poses.</p>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">How Priming Works</h2>
      <p class="leading-relaxed mb-4">Each of these triggers taps into sensory or physiological pathways to influence mood and focus in the moments leading up to competition. For example, upbeat music can elevate an athlete's mood, increase motivation, and synchronize movement rhythms, while certain postures can influence hormone levels and feelings of confidence.</p>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">Types of Priming</h2>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li><strong>Music:</strong> Upbeat tracks increase arousal; slower music calms nerves</li>
        <li><strong>Scent:</strong> Familiar or energizing scents can trigger positive associations</li>
        <li><strong>Power Poses:</strong> Expansive postures can increase confidence and reduce stress hormones</li>
        <li><strong>Movement:</strong> Dynamic warm-up routines that match performance intensity</li>
      </ul>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">Finding What Works</h2>
      <p class="leading-relaxed mb-4">The effectiveness of priming techniques is highly individual. What energizes one athlete may distract another. Experiment during training to discover which techniques help you achieve your optimal mental state.</p>

      <h2 class="font-display font-semibold text-2xl mt-8 mb-4">Timing Matters</h2>
      <p class="leading-relaxed mb-4">Priming techniques are most effective in the final 5-15 minutes before competition. Use them after your structured mental preparation to maintain or fine-tune your arousal level.</p>

      <p class="leading-relaxed">Your FocusMode routine can be combined with your preferred priming techniques to create a complete pre-match preparation system.</p>
    `
  },
];

export default function Knowledge() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="font-display font-semibold text-4xl mb-3 tracking-tight">Knowledge Base</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Evidence-based sports psychology techniques to enhance your mental preparation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {knowledgeArticles.map((article) => (
          <KnowledgeArticleCard key={article.id} {...article} />
        ))}
      </div>
    </div>
  );
}
