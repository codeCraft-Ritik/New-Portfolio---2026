import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Calendar, Award, MapPin, Trophy, Target, Sparkles, CheckCircle2 } from 'lucide-react';
import KVLogo from '../assets/KV-Logo.png';
import AmityLogo from '../assets/Amity-Logo.png';

const Education = () => {
  const education = [
    {
      level: '12th Standard',
      institution: 'Kendriya Vidyalaya',
      course: 'Science Stream (PCM)',
      location: 'India',
      year: '2022 - 2024',
      status: 'Completed',
      grade: 'Passed',
      icon: <BookOpen className="w-7 h-7" />,
      logo: KVLogo,
      color: 'from-orange-500 to-amber-500',
      highlights: ['Physics, Chemistry, Mathematics', 'Computer Science', 'Strong Foundation in Sciences']
    },
    {
      level: 'Undergraduate',
      institution: 'Amity University Noida',
      course: 'Bachelor of Computer Applications (Data Analytics)',
      location: 'Noida, Uttar Pradesh',
      year: 'July 2024 - Present',
      status: 'Pursuing',
      grade: 'CGPA: 8.40',
      icon: <GraduationCap className="w-7 h-7" />,
      logo: AmityLogo,
      color: 'from-cyan-500 to-blue-500',
      highlights: ['Data Analytics Specialization', 'Web Development', 'Database Management Systems']
    }
  ];

  const coursework = [
    { name: 'Web Development', progress: 95, color: '#61DAFB' },
    { name: 'Database Management', progress: 85, color: '#4DB33D' },
    { name: 'Data Structures', progress: 80, color: '#F7DF1E' },
    { name: 'Computer Networks', progress: 75, color: '#3178C6' },
    { name: 'Operating Systems', progress: 70, color: '#FF6C37' },
  ];

  const achievements = [
    { title: '100+ Users', desc: 'Real-world project impact', icon: <Trophy className="w-5 h-5" /> },
    { title: '8.40 CGPA', desc: 'Academic excellence', icon: <Award className="w-5 h-5" /> },
    { title: '4+ Projects', desc: 'Hands-on experience', icon: <Target className="w-5 h-5" /> },
    { title: 'MERN Stack', desc: 'Full-stack proficiency', icon: <Sparkles className="w-5 h-5" /> },
  ];

  return (
    <section id="education" className="py-16 md:py-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">
          Academic Journey
        </p>
        <h2 className="text-5xl md:text-7xl font-black">
          My{' '}
          <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Education
          </span>
        </h2>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Education Timeline (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-cyan-500 via-blue-500 to-purple-500 hidden md:block" />

            {education.map((edu, index) => (
              <motion.div
                key={edu.level}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative mb-8 md:pl-20"
              >
                {/* Timeline Dot */}
                <div className={`absolute left-4 top-8 w-8 h-8 rounded-full bg-linear-to-br ${edu.color} items-center justify-center text-white hidden md:flex shadow-lg`}>
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>

                {/* Card */}
                <div className="group bg-white/2 border border-white/10 rounded-3xl p-6 md:p-8 hover:border-cyan-500/30 transition-all duration-500 backdrop-blur-xl overflow-hidden relative">
                  {/* Background Glow */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br ${edu.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500`} />

                  {/* Logo and Header */}
                  <div className="flex flex-col sm:flex-row items-start gap-4 mb-6 relative">
                    {/* Logo Section */}
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      className="shrink-0 w-full sm:w-auto"
                    >
                      <img
                        src={edu.logo}
                        alt={`${edu.institution} logo`}
                        className="h-24 sm:h-28 w-auto object-contain bg-white/8 rounded-2xl p-3 border border-white/10 shadow-lg group-hover:border-cyan-500/30 transition-all"
                      />
                    </motion.div>

                    {/* Header Info */}
                    <div className="flex-1">
                      <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-linear-to-r ${edu.color} text-white mb-2`}>
                        {edu.level}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black group-hover:text-cyan-400 transition-colors">
                        {edu.institution}
                      </h3>
                      <p className="text-gray-400 text-sm mt-2">{edu.course}</p>
                    </div>

                    {/* Grade Badge */}
                    <div className={`px-4 py-2 rounded-full bg-linear-to-r ${edu.color} bg-opacity-10 border border-white/10 whitespace-nowrap`}>
                      <span className="text-sm font-bold text-white">{edu.grade}</span>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm border-t border-white/10 pt-5">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      <span>{edu.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span>{edu.location}</span>
                    </div>
                    <div className={`flex items-center gap-2 ${edu.status === 'Pursuing' ? 'text-green-400' : 'text-blue-400'}`}>
                      <div className={`w-2 h-2 rounded-full ${edu.status === 'Pursuing' ? 'bg-green-400 animate-pulse' : 'bg-blue-400'}`} />
                      <span className="font-medium">{edu.status}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Key Subjects</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 hover:border-cyan-500/30 transition-colors"
                        >
                          <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Stats & Coursework */}
        <div className="lg:col-span-1 space-y-6">
          {/* Achievements Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/2 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
          >
            <h4 className="text-lg font-black mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Achievements
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-cyan-500/30 transition-all group"
                >
                  <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    {achievement.icon}
                  </div>
                  <p className="text-lg font-black text-white">{achievement.title}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{achievement.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Relevant Coursework */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/2 border border-white/10 rounded-3xl p-6 backdrop-blur-xl"
          >
            <h4 className="text-lg font-black mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              Relevant Coursework
            </h4>
            <div className="space-y-4">
              {coursework.map((course, index) => (
                <motion.div
                  key={course.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-300">{course.name}</span>
                    <span className="text-xs font-bold text-gray-500">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${course.color}, ${course.color}88)`,
                        boxShadow: `0 0 10px ${course.color}50`
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Currently Learning */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-3xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider text-cyan-400">Currently Learning</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">Advanced React Patterns</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">System Design</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">Data Analytics with Python</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
