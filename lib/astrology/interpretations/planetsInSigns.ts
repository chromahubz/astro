/**
 * Planet in Sign Interpretations
 * Comprehensive interpretations for all planetary placements in zodiac signs
 */

import { ZodiacSign } from '../zodiac';

type PlanetSignInterpretation = Record<string, Record<ZodiacSign, string>>;

export const PLANET_IN_SIGN_INTERPRETATIONS: PlanetSignInterpretation = {
  Sun: {
    Aries: "With the Sun in Aries, you possess a pioneering spirit and natural leadership qualities. You approach life with courage, enthusiasm, and a directness that can be both refreshing and challenging to others. Your identity is tied to action and independence - you need to blaze your own trail and test your limits. While your competitive nature drives you to excel, learning patience and considering others' perspectives will help channel your tremendous energy constructively. You thrive when facing new challenges and may struggle with routine or following others' directions.",

    Taurus: "Your Sun in Taurus gives you a steady, reliable presence and an appreciation for life's sensual pleasures. You build your identity through creating security and cultivating beauty, whether in material form or relationships. Patient and persistent, you have remarkable endurance and finish what you start. Your practical nature grounds you, though you may sometimes resist change even when it's beneficial. You find fulfillment through tangible achievements and creating comfort for yourself and loved ones. Quality and authenticity matter deeply to you.",

    Gemini: "With the Sun in Gemini, your identity is defined by curiosity, communication, and mental agility. You're naturally versatile, able to adapt to different situations and connect with diverse people. Your mind constantly seeks new information and experiences, making you a perpetual student of life. While this gives you breadth of knowledge, you may sometimes lack depth or scatter your energy too widely. You express yourself best through words, whether written or spoken, and need mental stimulation like others need air.",

    Cancer: "Your Sun in Cancer creates a deeply emotional and nurturing core to your identity. You experience life through feelings and have a remarkable capacity for empathy and care. Home and family (whether biological or chosen) form the foundation of your sense of self. Your intuition is powerful, and you protect those you love with fierce loyalty. Learning to manage your sensitivity and not take things personally helps you maintain emotional balance. You find purpose in creating security and emotional connections.",

    Leo: "The Sun in Leo places you in the sign it rules, giving you natural confidence and creative self-expression. Your identity revolves around being seen, appreciated, and making a meaningful impact. You have a generous heart and natural warmth that draws others to you. Pride in your accomplishments and creations is healthy, though watching for excessive need for approval serves you well. You're meant to shine and inspire others, channeling your considerable creative energy into endeavors that bring joy to yourself and others.",

    Virgo: "With the Sun in Virgo, your identity centers on service, improvement, and attention to detail. You have a discriminating mind that notices what others miss and an innate desire to make things better. Your analytical nature and practical skills make you invaluable in solving problems. While your high standards drive excellence, they can also create unnecessary self-criticism. You find meaning through useful work and helping others develop their potential. Your path involves honoring both the process and the outcome.",

    Libra: "Your Sun in Libra creates an identity focused on harmony, relationships, and aesthetic balance. You see life through the lens of partnership and fairness, naturally considering multiple perspectives. Your diplomatic nature and social grace help bridge divides and create beauty in the world. Learning to make decisions without excessive deliberation and to honor your own needs alongside others' strengthens your core. You're meant to create balance and bring people together, whether through art, mediation, or conscious relationship.",

    Scorpio: "The Sun in Scorpio gives you an intense, transformative approach to life and identity. You experience everything deeply and have a natural understanding of life's mysteries and hidden dimensions. Your emotional power and psychological insight allow you to transform both yourself and your environment. While your depth is a gift, learning to trust and be vulnerable without fear of betrayal is part of your journey. You're meant to dive beneath surfaces, heal wounds, and facilitate profound change.",

    Sagittarius: "With the Sun in Sagittarius, your identity is linked to exploration, expansion, and the search for meaning. You approach life with optimism and philosophical curiosity, always seeking to understand the bigger picture. Freedom is essential to your well-being, and you need space to roam - whether physically, mentally, or spiritually. Your enthusiasm inspires others, though tempering it with realism helps you achieve your goals. You find purpose through teaching, traveling, or expanding consciousness in some way.",

    Capricorn: "Your Sun in Capricorn creates an identity built on achievement, responsibility, and long-term vision. You understand that worthwhile things take time and effort, and you're willing to work steadily toward your goals. Natural authority and respect for structure guide you, though learning to balance ambition with enjoyment of the present moment enriches your life. You're meant to build something lasting, whether a career, legacy, or contribution to society. Patience and persistence are your greatest allies.",

    Aquarius: "The Sun in Aquarius gives you an innovative, humanitarian approach to identity and life purpose. You value freedom, originality, and progress, often thinking ahead of your time. Your identity includes being part of groups and causes larger than yourself, yet you maintain your individuality. While your detached perspective offers clarity, connecting with emotions - your own and others' - brings wholeness. You're meant to contribute to collective evolution through unique insights and by championing progressive ideals.",

    Pisces: "With the Sun in Pisces, your identity flows like water, compassionate, imaginative, and spiritually attuned. You have natural empathy and artistic sensitivity, able to transcend everyday reality and connect with something greater. Your boundaries between self and other can be fluid, making discernment about what's yours versus others' feelings important. You're meant to bring healing, inspiration, and transcendence into the world, whether through art, service, or spiritual pursuits. Your path involves honoring both your dreams and earthly reality."
  },

  Moon: {
    Aries: "Your Moon in Aries gives you emotional spontaneity and independence. You feel things intensely and immediately, responding to emotions with action rather than reflection. Emotional fulfillment comes through new experiences, challenges, and autonomy. You need freedom to express feelings directly and may become restless when life feels too predictable. Learning to pause before reacting and considering others' emotional rhythms helps relationships. Your emotional courage inspires others to be authentic.",

    Taurus: "The Moon in Taurus creates emotional stability and a need for security and comfort. You process feelings slowly and steadily, seeking to create calm environments. Physical comfort, beautiful surroundings, and sensual pleasures soothe your emotions. You're deeply loyal and resist emotional change, sometimes staying in situations past their expiration date. Your emotional steadiness provides a safe harbor for others. You feel most secure when life is predictable and your basic needs are abundantly met.",

    Gemini: "With the Moon in Gemini, your emotions are expressed through communication and intellectual processing. You need variety and mental stimulation to feel emotionally satisfied. Talking about feelings helps you understand and process them. Your emotional nature is curious and changeable, adaptable to different social situations. You may intellectualize emotions rather than feel them directly. Emotional connection happens through conversation, learning together, and sharing ideas.",

    Cancer: "The Moon in Cancer is in its home sign, creating powerful emotional depth and intuition. Your feelings are extremely sensitive and you have remarkable empathy. Emotional security comes through nurturing and being nurtured, with home and family central to your well-being. You may sometimes retreat into your protective shell when hurt. Your emotional memory is exceptional - both a gift and a challenge. You need to feel emotionally safe before opening up fully.",

    Leo: "Your Moon in Leo needs appreciation, creative expression, and emotional warmth. You feel best when you're celebrated and when your generous nature is acknowledged. Emotional fulfillment comes through creative pursuits, romance, and being able to shine. You're warm-hearted and loyal, though your pride can be wounded if feelings aren't reciprocated. You need to express emotions dramatically and may sulk if ignored. Your emotional authenticity and warmth light up any room.",

    Virgo: "The Moon in Virgo creates emotional fulfillment through service, order, and self-improvement. You process feelings analytically, sometimes over-thinking them. Emotional security comes from being useful and having routines. You show care through practical help rather than overt displays of affection. Critical self-analysis can create emotional anxiety if unchecked. You need to feel competent and organized to be emotionally at peace. Small acts of service are how you demonstrate love.",

    Libra: "With the Moon in Libra, emotional balance comes through harmonious relationships and beautiful environments. You need partnership and feel unsettled when alone for long. You process emotions by discussing them and considering different perspectives. Conflict disturbs you deeply, and you'll work hard to restore peace. Your emotional nature is diplomatic and fair-minded, though you may struggle with indecisiveness. You feel most secure in balanced, aesthetically pleasing surroundings.",

    Scorpio: "The Moon in Scorpio creates intense emotional depth and a need for profound connections. You feel everything powerfully and have little interest in superficiality. Emotional security requires complete trust and intimacy - you're all in or all out. Your emotional nature is private and you guard your vulnerabilities carefully. You have powerful intuition about others' hidden motives. Emotional transformation and psychological exploration fulfill you. You need depth, honesty, and loyalty.",

    Sagittarius: "Your Moon in Sagittarius needs freedom, adventure, and philosophical understanding for emotional fulfillment. You process feelings through optimism and humor, sometimes glossing over pain too quickly. Emotional security comes from having options and room to explore. You feel stifled by too much routine or emotional heaviness. Travel, learning, and expanding your horizons brings emotional satisfaction. You need to believe in possibilities and maintain independence even in close relationships.",

    Capricorn: "The Moon in Capricorn creates emotional reserve and a need for control over feelings. You're practical about emotions, sometimes appearing cooler than you actually feel. Emotional security comes through achievement, responsibility, and tangible progress. You may have difficulty expressing vulnerability or asking for emotional support. Structure and long-term planning comfort you. You show love through reliability and taking on responsibility. Success and respect feed your emotional well-being.",

    Aquarius: "With the Moon in Aquarius, you need emotional freedom and intellectual companionship. You process feelings objectively, sometimes detaching rather than feeling deeply. Emotional fulfillment comes through friendship, groups, and working toward ideals. You're uncomfortable with excessive displays of emotion or possessiveness. Your humanitarian concerns extend beyond personal relationships. You need space, progressive ideals, and acceptance of your uniqueness to feel emotionally secure.",

    Pisces: "The Moon in Pisces creates profound emotional sensitivity and compassionate understanding. You absorb others' emotions like a sponge and have difficulty maintaining boundaries. Emotional fulfillment comes through creative expression, spiritual connection, and helping others. You process feelings through imagination, dreams, and artistic pursuits. Your empathy is both a gift and a challenge - you need time alone to process what you've absorbed. Music, water, and spiritual practices soothe your soul."
  },

  Mercury: {
    Aries: "Mercury in Aries gives you a quick, direct communication style and rapid mental processes. You think and speak with confidence, sometimes before fully considering all angles. Your mind is pioneering and courageous, generating original ideas. You communicate assertively and may interrupt others in your enthusiasm. Mental stimulation comes through debates, new concepts, and intellectual challenges. Learning to listen as well as speak strengthens your communication.",

    Taurus: "With Mercury in Taurus, your thinking is practical, methodical, and thorough. You prefer to take your time processing information and making decisions. Your communication is deliberate and you choose words carefully. You think about tangible results and real-world applications. While your mental steadiness is valuable, you may resist new ideas or take longer to adapt to change. You learn best through hands-on experience and concrete examples.",

    Gemini: "Mercury in Gemini is in its ruling sign, creating exceptional communication skills and mental agility. Your mind is quick, curious, and endlessly versatile. You're a natural conversationalist who can discuss almost anything. Information gathering and sharing ideas energize you. While your mental flexibility is impressive, focusing on depth rather than just breadth enhances your learning. You excel at multitasking and making connections between different subjects.",

    Cancer: "Mercury in Cancer creates thinking colored by emotions and intuition. Your mind is receptive and empathetic, understanding others through feeling. You communicate with sensitivity and remember conversations in emotional detail. Your thoughts often drift to the past and family matters. While your intuitive intelligence is powerful, emotional reactions can sometimes cloud objective thinking. You express yourself best in safe, supportive environments.",

    Leo: "With Mercury in Leo, you think and communicate with confidence, creativity, and flair. Your ideas are bold and you express them dramatically. You enjoy being heard and appreciated for your thoughts. Mental stimulation comes through creative projects and topics that inspire you. Your communication style is warm and encouraging, though watch for excessive self-focus. You think about how to make an impact and leave your mark.",

    Virgo: "Mercury in Virgo is in its other ruling sign, creating analytical precision and attention to detail. Your mind is discriminating, practical, and service-oriented. You communicate clearly and precisely, noticing errors others miss. Organization and efficiency in thinking and communication satisfy you. While your analytical skills are exceptional, excessive criticism of self and others can be limiting. You excel at problem-solving and improving systems.",

    Libra: "Mercury in Libra gives you balanced thinking and diplomatic communication. You naturally see multiple perspectives and can present all sides fairly. Your mind seeks harmony and beauty, appreciating elegant ideas and refined expression. You think about relationships, fairness, and aesthetic balance. While your ability to see all sides is valuable, it can lead to indecisiveness. You communicate best in partnership and social settings.",

    Scorpio: "With Mercury in Scorpio, your thinking goes deep and you communicate with intensity. Your mind is investigative, seeking to uncover hidden truths. You think about psychology, mysteries, and transformation. Your communication is direct about important matters, though you may be secretive about your own thoughts. Mental stimulation comes from research, depth psychology, and uncovering what's beneath the surface. Your insights are penetrating and transformative.",

    Sagittarius: "Mercury in Sagittarius creates expansive thinking and enthusiastic communication. Your mind is philosophical, always seeking meaning and understanding. You think big picture rather than details, and communicate with optimism and humor. Mental stimulation comes through learning, teaching, and exploring new ideas. While your visionary thinking inspires, attention to practical details strengthens your ideas. You're honest to a fault - tact isn't your strong suit.",

    Capricorn: "With Mercury in Capricorn, your thinking is structured, pragmatic, and goal-oriented. You communicate with authority and prefer substantial conversations. Your mind is strategic, planning for long-term success. You think about responsibility, achievement, and how to build lasting results. While your practical thinking is valuable, allowing for spontaneity and play enriches your mental life. You express yourself most confidently in professional settings.",

    Aquarius: "Mercury in Aquarius gives you original, innovative thinking and unique communication. Your mind is progressive, scientific, and humanitarian. You think about the future, technology, and how to improve society. Your communication style is friendly but slightly detached, preferring ideas to emotions. Mental stimulation comes from innovation, groups, and revolutionary concepts. Your intellectual independence and objectivity offer valuable perspectives.",

    Pisces: "With Mercury in Pisces, your thinking is intuitive, imaginative, and fluid. Your mind works through symbols, metaphors, and feelings rather than pure logic. You communicate with empathy and poetic expression. Mental boundaries are flexible - you absorb information psychically. While your imaginative intelligence is profound, grounding abstract thoughts in practical reality helps others understand you. You think about spirituality, creativity, and unity."
  },

  Venus: {
    Aries: "Venus in Aries creates passionate, direct expressions of love and attraction. You fall in love quickly and pursue what you desire with courage. You're attracted to confidence, independence, and excitement in relationships. While your enthusiasm is attractive, you may need to develop patience and staying power. You value honesty and authenticity in love. Your aesthetic taste tends toward bold, energetic expressions.",

    Taurus: "With Venus in Taurus, in its ruling sign, you express affection through loyalty, sensuality, and creating comfort. You attract and appreciate quality, beauty, and stability. Love develops slowly but lasts - you're patient and devoted. You show love through physical touch, gifts, and creating security. Your aesthetic sense is refined and natural. Jealousy and possessiveness can arise from your need for security.",

    Gemini: "Venus in Gemini creates variety, playfulness, and intellectual connection in relationships. You're attracted to wit, communication, and mental stimulation. You express affection through words, ideas, and keeping things interesting. You need friendship and conversation in romance. While your adaptability is charming, you may struggle with commitment if it means monotony. You appreciate clever, versatile beauty.",

    Cancer: "With Venus in Cancer, you express love through nurturing, emotional care, and creating home. You're attracted to sensitivity, emotional depth, and family values. You need emotional security to open your heart fully. Your love is loyal and protective, though you may be cautious initially. You show affection through cooking, caring, and making others comfortable. You appreciate beauty that evokes emotion and nostalgia.",

    Leo: "Venus in Leo expresses love dramatically, generously, and with whole-hearted devotion. You're attracted to confidence, creativity, and those who make you feel special. You love romance, celebration, and grand gestures. Loyalty and pride characterize your relationships - you expect and give admiration. While your warmth is magnetic, watch for excessive need for attention. You appreciate bold, glamorous beauty.",

    Virgo: "With Venus in Virgo, you express love through practical service and attention to details. You're attracted to competence, refinement, and those who appreciate your helpful nature. You show affection through acts of service rather than overt displays. Your love is dedicated but somewhat reserved. Perfectionism can create unrealistic expectations. You appreciate understated, natural beauty.",

    Libra: "Venus in Libra is in its other ruling sign, creating grace, charm, and relationship focus. You're attracted to harmony, beauty, and balanced partnerships. You express love through consideration, diplomacy, and creating aesthetic beauty. Relationships are central to your happiness. While your partnership skills are exceptional, maintaining your identity within relationships is important. You have exquisite aesthetic taste.",

    Scorpio: "With Venus in Scorpio, you love deeply, intensely, and with complete commitment. You're attracted to depth, power, and transformative connections. You express affection through profound intimacy and loyalty. Superficial interactions don't interest you - you need soul-level bonding. Jealousy and possessiveness can challenge relationships. You appreciate mysterious, provocative beauty.",

    Sagittarius: "Venus in Sagittarius creates adventurous, philosophical expressions of love. You're attracted to freedom, optimism, and those who expand your horizons. You express affection through shared adventures, humor, and intellectual exploration. You need independence even in committed relationships. While your enthusiasm is infectious, commitment to routine may challenge you. You appreciate exotic, expansive beauty.",

    Capricorn: "With Venus in Capricorn, you express love through loyalty, responsibility, and long-term commitment. You're attracted to maturity, achievement, and those who take relationships seriously. You show affection through providing security and patient dedication. Love develops slowly but endures. While your faithful nature is admirable, allowing emotional spontaneity enriches relationships. You appreciate classic, enduring beauty.",

    Aquarius: "Venus in Aquarius creates unique, independent expressions of love and attraction. You're drawn to originality, intelligence, and those who respect your freedom. You express affection through friendship, intellectual connection, and progressive ideals. You need space and equality in relationships. While your open-minded approach is refreshing, emotional intimacy may need conscious development. You appreciate unconventional, futuristic beauty.",

    Pisces: "With Venus in Pisces, exalted, you love with compassion, idealism, and spiritual connection. You're attracted to sensitivity, creativity, and soulful bonds. You express affection through empathy, sacrifice, and unconditional acceptance. Boundaries in relationships can be challenging - you merge completely. While your devotion is beautiful, discernment about who deserves it matters. You appreciate dreamy, ethereal beauty."
  },

  Mars: {
    Aries: "Mars in Aries, in its ruling sign, gives you direct, courageous, and competitive energy. You take action quickly and decisively, leading rather than following. Your drive is strong and you're willing to fight for what you want. While your initiative is impressive, learning patience and considering consequences serves you well. You assert yourself boldly and honestly. Physical activity and challenges energize you.",

    Taurus: "With Mars in Taurus, your drive is steady, persistent, and focused on tangible results. You take action deliberately, building toward goals with patient determination. Once committed, your endurance is remarkable. You assert yourself through quiet strength rather than aggression. While your reliability is valuable, you may be slow to start or resist necessary change. Sensual pleasures and working with your hands satisfy you.",

    Gemini: "Mars in Gemini creates varied, mental, and communicative energy. You take action through words, ideas, and multitasking. Your drive is curious and adaptable, though you may scatter your energy. You assert yourself through wit, debate, and clever strategies. While your versatility is useful, completing what you start strengthens your effectiveness. Mental challenges and learning new skills energize you.",

    Cancer: "With Mars in Cancer, your drive is protective, emotional, and indirect. You take action based on feelings and to protect what you care about. You assert yourself through emotional intelligence and creating security. Your energy fluctuates with your moods. While your caring drive is admirable, direct expression of anger may need development. Defending home and family motivates you powerfully.",

    Leo: "Mars in Leo gives you confident, creative, and dramatic energy. You take action boldly and with flair, wanting to make an impact. Your drive is tied to pride and recognition. You assert yourself regally, expecting respect. While your leadership energy is powerful, tempering ego with genuine consideration for others enhances relationships. Creative projects and inspiring others energize you.",

    Virgo: "With Mars in Virgo, your energy is precise, analytical, and service-oriented. You take action efficiently, perfecting as you go. Your drive is to improve, fix, and be useful. You assert yourself through competence and practical problem-solving. While your attention to detail is valuable, perfectionism can create frustration. Organized work and helping others channels your energy well.",

    Libra: "Mars in Libra, in its detriment, creates refined, diplomatic, and partnership-oriented energy. You take action through cooperation and strategic charm rather than direct force. Your drive is to create fairness and harmony. You assert yourself indirectly and may struggle with decisiveness. While your diplomatic approach smooths conflicts, learning direct assertion when needed serves you. Working with others and creating beauty energizes you.",

    Scorpio: "Mars in Scorpio is in one of its traditional ruling signs, creating intense, focused, and transformative energy. You take action with strategic depth and emotional power. Your drive is to penetrate beneath surfaces and transform situations. You assert yourself with controlled intensity and remarkable willpower. Your sexual energy is powerful. Psychological insight and profound change motivate you.",

    Sagittarius: "With Mars in Sagittarius, your energy is enthusiastic, adventurous, and philosophical. You take action with optimism and big-picture vision. Your drive is to explore, expand, and find meaning. You assert yourself through honesty and inspiration. While your adventurous spirit is admirable, following through on details may challenge you. Travel, learning, and idealistic causes energize you.",

    Capricorn: "Mars in Capricorn, exalted, gives you disciplined, ambitious, and strategic energy. You take action with patience, planning, and awareness of long-term goals. Your drive is to achieve, build, and gain mastery. You assert yourself through authority and proven competence. Your endurance and self-control are exceptional. Concrete accomplishments and climbing the mountain energize you.",

    Aquarius: "With Mars in Aquarius, your energy is innovative, rebellious, and humanitarian. You take action for progressive causes and original ideas. Your drive is to revolutionize and liberate. You assert yourself through intellectual brilliance and refusing to conform. While your independent action is admirable, cooperation can enhance effectiveness. Social causes and technological innovation energize you.",

    Pisces: "Mars in Pisces creates compassionate, intuitive, and fluid energy. You take action based on inspiration and to help others. Your drive is spiritual and imaginative rather than competitive. You assert yourself indirectly, sometimes passively. While your gentle approach is kind, stronger boundaries serve you well. Creative expression, spiritual practices, and compassionate service energize you."
  },

  Jupiter: {
    Aries: "Jupiter in Aries expands through courage, leadership, and pioneering action. You grow by taking initiative and exploring new territory. Your faith is in yourself and your ability to forge ahead. You're generous with enthusiasm and inspiration. While your adventurous optimism opens doors, tempering impulsiveness with wisdom enhances outcomes. Teaching others to be courageous fulfills you.",

    Taurus: "With Jupiter in Taurus, expansion comes through building security and appreciating beauty. You grow through patience, sensual experiences, and creating abundance. Your faith is in the material world's ability to provide. You're generous with resources and comfort. While your appreciation for quality enriches life, attachment to possessions can limit you. You find meaning in cultivation and manifestation.",

    Gemini: "Jupiter in Gemini expands through learning, communication, and variety. You grow by gathering and sharing information from diverse sources. Your faith is in the power of ideas and connection. You're generous with knowledge and enthusiasm for learning. While your intellectual curiosity is admirable, depth complements breadth. Teaching, writing, and facilitating connections fulfill you.",

    Cancer: "With Jupiter in Cancer, exalted, expansion comes through nurturing, emotional connection, and creating home. You grow through caring for others and honoring feelings. Your faith is in love, family, and emotional bonds. You're generous with emotional support and hospitality. Your protective instinct is strong. Creating emotional security and helping others feel at home brings meaning.",

    Leo: "Jupiter in Leo expands through creative expression, generosity, and celebration. You grow by shining your light and inspiring others. Your faith is in the human spirit's capacity for joy and creation. You're magnanimous and warm-hearted. While your confidence attracts abundance, sharing the spotlight enhances relationships. Creative self-expression and uplifting others fulfill you.",

    Virgo: "With Jupiter in Virgo, expansion comes through improvement, service, and practical wisdom. You grow by perfecting skills and helping others develop. Your faith is in the power of dedicated work and attention to detail. You're generous with practical help and useful knowledge. Finding meaning through meaningful work and facilitating others' growth satisfies you.",

    Libra: "Jupiter in Libra expands through relationships, diplomacy, and creating harmony. You grow through partnership and understanding diverse perspectives. Your faith is in justice, balance, and human connection. You're generous with fair treatment and social grace. While your diplomatic skills create opportunities, maintaining your truth is important. Facilitating peace and beauty brings meaning.",

    Scorpio: "With Jupiter in Scorpio, expansion comes through depth, transformation, and uncovering truth. You grow by exploring mysteries and psychological insight. Your faith is in the power of transformation and rebirth. You're generous with emotional intensity and commitment. While your depth creates profound growth, allowing lightness enriches life. Healing and transformation fulfill you.",

    Sagittarius: "Jupiter in Sagittarius is in its ruling sign, creating natural expansion, optimism, and philosophical wisdom. You grow through adventure, higher education, and seeking truth. Your faith in possibilities and meaning is strong. You're generous with enthusiasm and vision. Your natural teaching ability inspires others. Travel, philosophy, and expanding consciousness bring deep fulfillment.",

    Capricorn: "With Jupiter in Capricorn, expansion comes through discipline, achievement, and mastery. You grow through responsibility, patience, and building lasting structures. Your faith is in hard work's ability to create success. You're generous with wisdom and practical support. While your grounded approach ensures sustainable growth, allowing joy in the journey enriches experience. Integrity and accomplishment fulfill you.",

    Aquarius: "Jupiter in Aquarius expands through innovation, humanitarian causes, and progressive thinking. You grow through groups, original ideas, and working for the collective. Your faith is in humanity's potential and technological progress. You're generous with friendship and idealistic vision. While your forward-thinking creates opportunities, staying connected to present reality grounds your vision. Contributing to evolution fulfills you.",

    Pisces: "With Jupiter in Pisces, in one of its traditional ruling signs, expansion comes through compassion, spirituality, and transcendence. You grow through faith, imagination, and dissolving boundaries. Your belief in universal love and divine grace is profound. You're generous with forgiveness and spiritual wisdom. Creative expression, spiritual practice, and selfless service bring deep meaning."
  },

  Saturn: {
    Aries: "Saturn in Aries creates lessons around patience, assertion, and self-confidence. You may initially doubt your ability to lead or take initiative. Your growth involves learning to act courageously despite fears. Discipline applied to pioneering endeavors builds mastery. While impulsiveness needs tempering, excessive caution also limits you. Mature self-assertion and patient courage develop over time.",

    Taurus: "With Saturn in Taurus, lessons involve security, values, and material stability. You may experience challenges around resources early in life, teaching you to build carefully. Your growth involves creating lasting security through patient effort. Discipline with finances and possessions serves you well. While valuing quality is admirable, rigid attachment creates suffering. Sustainable abundance develops through time.",

    Gemini: "Saturn in Gemini creates lessons around communication, learning, and mental focus. You may initially doubt your intelligence or ability to express yourself clearly. Your growth involves developing disciplined thinking and structured communication. Overcoming superficiality to achieve depth in learning serves you. While curiosity is valuable, focused study builds authority. Mastery comes through committed intellectual development and teaching what you've learned thoroughly.",

    Cancer: "With Saturn in Cancer, lessons involve emotional security, nurturing, and home life. You may experience early challenges with family or difficulty expressing emotions freely. Your growth involves learning to create genuine emotional safety for yourself and others. Developing mature caregiving that doesn't sacrifice self serves you. While protecting your heart is understandable, walls that keep out pain also keep out love. Emotional wisdom and secure foundations develop through time.",

    Leo: "Saturn in Leo creates lessons around creative expression, recognition, and authentic self. You may initially struggle with confidence or doubt your right to shine. Your growth involves developing genuine self-worth independent of external validation. Learning that true leadership serves others while expressing your unique gifts enriches your path. While humility is valuable, dimming your light serves no one. Creative mastery and heart-centered authority develop through dedication.",

    Virgo: "With Saturn in Virgo, lessons involve perfectionism, service, and practical wisdom. You may be overly critical of yourself and your work, never feeling good enough. Your growth involves developing discernment without harsh judgment. Learning that excellence and perfection differ serves you well. While attention to detail is admirable, accepting imperfection as part of wholeness brings peace. Mature service and craftsmanship develop through practice.",

    Libra: "Saturn in Libra, exalted, creates lessons around relationships, balance, and fairness. You may face challenges in partnerships that teach mature relating and healthy boundaries. Your growth involves developing genuine equality in relationships rather than codependency. Learning to commit fully while maintaining identity serves you. While harmony is valuable, authentic peace sometimes requires addressing conflict. Relationship wisdom and fair judgment develop through experience.",

    Scorpio: "With Saturn in Scorpio, lessons involve emotional depth, transformation, and shared resources. You may fear intimacy or loss of control initially. Your growth involves developing trust and healthy vulnerability without losing your power. Learning to share resources and power equitably serves you. While self-protection is natural, walls prevent deep connection. Mastery over emotional intensity and transformative wisdom develop through facing your shadows.",

    Sagittarius: "Saturn in Sagittarius creates lessons around belief systems, expansion, and truth-seeking. You may doubt your faith or struggle to find meaningful philosophy early on. Your growth involves developing earned wisdom rather than borrowed beliefs. Learning to balance optimism with realism serves you well. While seeking truth is admirable, recognizing partial truths as part of larger understanding deepens wisdom. Mature faith and philosophical authority develop through experience.",

    Capricorn: "Saturn in Capricorn is in its ruling sign, creating natural discipline, responsibility, and ambition. Your lessons involve proper use of authority and long-term planning. You take responsibility seriously, sometimes too seriously. Your growth comes through building enduring structures and achievements. While your work ethic is admirable, balancing achievement with personal life enriches you. Mastery and integrity define your path.",

    Aquarius: "With Saturn in Aquarius, in one of its traditional ruling signs, lessons involve groups, innovation, and social responsibility. You learn to balance individuality with collective good. Your growth involves disciplined application of original ideas. While your progressive ideals are valuable, patience with social change serves you. Mature contribution to humanity's evolution defines your achievement.",

    Pisces: "Saturn in Pisces creates lessons around boundaries, spirituality, and compassion. You may struggle with structure versus flow, learning to ground spiritual insights. Your growth involves disciplined spiritual practice and healthy boundaries. While your compassion is beautiful, discernment about where to invest energy is crucial. Structured spirituality and compassionate wisdom develop over time."
  },

  Uranus: {
    Aries: "Uranus in Aries brings revolutionary energy toward pioneering and independence. You're part of a generation innovating leadership and individual expression. Your unique contribution involves courageously breaking new ground. While your independence is admirable, collaboration enhances innovation. You revolutionize how people assert themselves and take initiative.",

    Taurus: "With Uranus in Taurus, your generation innovates around resources, values, and security. You bring revolutionary approaches to finance, food, and material stability. While tradition provides foundation, you're willing to experiment with new methods. Your unique contribution involves sustainable innovation. You revolutionize what society values and how abundance is created.",

    Gemini: "Uranus in Gemini creates innovation in communication, learning, and connection. Your generation revolutionizes how information is shared and processed. Your unique contribution involves new ways of thinking and communicating. While your mental flexibility is impressive, depth complements innovation. You revolutionize education, media, and human connection.",

    Cancer: "With Uranus in Cancer, your generation innovates around home, family, and emotional security. You bring revolutionary approaches to nurturing and domestic life. While honoring emotional needs is important, you experiment with new forms of family and home. Your unique contribution involves evolving how we care for each other.",

    Leo: "Uranus in Leo brings innovation to creative expression, entertainment, and leadership. Your generation revolutionizes performance, celebration, and individual recognition. While tradition has value, you experiment with new forms of creativity. Your unique contribution involves evolving how we create, play, and express individuality.",

    Virgo: "With Uranus in Virgo, your generation innovates around health, work, and practical systems. You bring revolutionary approaches to wellness, service, and efficiency. While established methods have merit, you experiment with new techniques. Your unique contribution involves evolving how we work and maintain health.",

    Libra: "Uranus in Libra creates innovation in relationships, justice, and aesthetics. Your generation revolutionizes partnership, fairness, and beauty. While relationship traditions provide context, you experiment with new forms of connection. Your unique contribution involves evolving how we relate and create harmony.",

    Scorpio: "With Uranus in Scorpio, your generation innovates around transformation, sexuality, and shared resources. You bring revolutionary approaches to depth, power, and regeneration. While psychological insight is valuable, you experiment with new healing methods. Your unique contribution involves evolving how we transform and share power.",

    Sagittarius: "Uranus in Sagittarius brings innovation to philosophy, education, and expansion. Your generation revolutionizes belief systems, higher learning, and cultural exchange. While wisdom traditions provide foundation, you experiment with new understandings. Your unique contribution involves evolving how we find meaning and truth.",

    Capricorn: "With Uranus in Capricorn, your generation innovates around authority, structure, and achievement. You bring revolutionary approaches to government, business, and responsibility. While established institutions provide stability, you experiment with new structures. Your unique contribution involves evolving societal organization and leadership.",

    Aquarius: "Uranus in Aquarius is in its ruling sign, creating natural innovation, humanitarianism, and progress. Your generation revolutionizes technology, community, and human potential. While individual freedom is crucial, collective good guides innovation. Your unique contribution involves quantum leaps in human consciousness and social evolution.",

    Pisces: "With Uranus in Pisces, your generation innovates around spirituality, creativity, and compassion. You bring revolutionary approaches to transcendence, healing, and unity. While spiritual traditions provide wisdom, you experiment with new mystical understandings. Your unique contribution involves evolving consciousness and dissolving barriers."
  },

  Neptune: {
    Aries: "Neptune in Aries dissolves boundaries around individuality and action. Your generation dreams of spiritual warriors and inspired leadership. While courage is admirable, discernment between genuine inspiration and escapist fantasy serves you. Your collective vision involves unifying spirit and action.",

    Taurus: "With Neptune in Taurus, your generation dreams about unity with nature and spiritual abundance. You dissolve boundaries around material security, seeking higher purpose in resources. While practical needs matter, spiritual values guide material life. Your collective vision involves sacred relationship with Earth.",

    Gemini: "Neptune in Gemini creates dreams about universal communication and divine ideas. Your generation dissolves boundaries between minds, seeking telepathic connection. While clear thinking matters, intuitive knowing complements logic. Your collective vision involves spiritualizing thought and communication.",

    Cancer: "With Neptune in Cancer, your generation dreams about universal family and collective nurturance. You dissolve boundaries around home, seeking spiritual family. While emotional needs are real, transcendent love guides care. Your collective vision involves unified compassionate care for all beings.",

    Leo: "Neptune in Leo creates dreams about divine creativity and universal love. Your generation dissolves boundaries around individual expression, seeking spiritual artistry. While personal creativity matters, channeling universal inspiration elevates creation. Your collective vision involves art as spiritual practice.",

    Virgo: "With Neptune in Virgo, your generation dreams about sacred service and divine perfection. You dissolve boundaries around work, seeking spiritual purpose in daily tasks. While practical efficiency matters, devotional service elevates labor. Your collective vision involves work as spiritual practice and healing service.",

    Libra: "Neptune in Libra creates dreams about universal harmony and divine partnership. Your generation dissolves boundaries in relationships, seeking spiritual union. While individual needs matter, transcendent love guides connection. Your collective vision involves relationships as spiritual path and universal peace.",

    Scorpio: "With Neptune in Scorpio, your generation dreams about collective transformation and mystical power. You dissolve boundaries around depth, seeking spiritual regeneration. While psychological insight matters, transcendent healing guides change. Your collective vision involves death-rebirth as spiritual awakening.",

    Sagittarius: "Neptune in Sagittarius creates dreams about universal truth and divine meaning. Your generation dissolves boundaries around belief, seeking spiritual wisdom beyond dogma. While philosophy matters, mystical experience guides understanding. Your collective vision involves spiritualizing knowledge and finding unity in diversity.",

    Capricorn: "With Neptune in Capricorn, your generation dreams about spiritual authority and divine structure. You dissolve boundaries around achievement, seeking higher purpose in success. While material accomplishment matters, spiritual integrity guides ambition. Your collective vision involves leadership as spiritual service.",

    Aquarius: "Neptune in Aquarius creates dreams about collective consciousness and divine innovation. Your generation dissolves boundaries around individuality, seeking universal mind. While personal freedom matters, mystical unity guides progress. Your collective vision involves technology serving spiritual evolution and universal brotherhood.",

    Pisces: "With Neptune in Pisces, in its ruling sign, your generation dreams about universal love and complete dissolution. You dissolve all boundaries, seeking return to source. While earthly life matters, transcendent experience guides being. Your collective vision involves awakening to absolute unity and unconditional compassion."
  },

  Pluto: {
    Aries: "Pluto in Aries transforms individual expression and assertion. Your generation revolutionizes self-identity and personal power. Collective shadow involves unchecked aggression; light involves empowered authenticity. Your transformative mission involves evolving how humanity expresses individual will.",

    Taurus: "With Pluto in Taurus, your generation transforms values, resources, and security. You revolutionize material relationship and what society treasures. Collective shadow involves greed and environmental destruction; light involves sustainable abundance. Your transformative mission involves evolving humanity's relationship with Earth and resources.",

    Gemini: "Pluto in Gemini transforms communication, learning, and connection. Your generation revolutionizes thought and information exchange. Collective shadow involves propaganda and mental manipulation; light involves truth and conscious communication. Your transformative mission involves evolving how humanity thinks and shares knowledge.",

    Cancer: "With Pluto in Cancer, your generation transforms home, family, and emotional security. You revolutionize nurturing and belonging. Collective shadow involves toxic family patterns and emotional manipulation; light involves conscious care and authentic feeling. Your transformative mission involves evolving how humanity nurtures and creates home.",

    Leo: "Pluto in Leo transforms creativity, self-expression, and leadership. Your generation revolutionizes individuality and celebration. Collective shadow involves ego inflation and tyranny; light involves authentic creative power and heart-centered leadership. Your transformative mission involves evolving personal expression and joy.",

    Virgo: "With Pluto in Virgo, your generation transforms work, health, and service. You revolutionize practical systems and wellness approaches. Collective shadow involves perfectionism and health anxiety; light involves holistic healing and meaningful service. Your transformative mission involves evolving how humanity works and maintains wellbeing.",

    Libra: "Pluto in Libra transforms relationships, justice, and harmony. Your generation revolutionizes partnership and fairness. Collective shadow involves codependency and superficial peace; light involves empowered relating and authentic justice. Your transformative mission involves evolving how humanity connects and creates balance.",

    Scorpio: "With Pluto in Scorpio, in its ruling sign, your generation transforms power, sexuality, and regeneration. You revolutionize depth and resource sharing. Collective shadow involves power abuse and sexual wounding; light involves profound healing and empowered intimacy. Your transformative mission involves evolving humanity's relationship with power and transformation.",

    Sagittarius: "Pluto in Sagittarius transforms belief, meaning, and expansion. Your generation revolutionizes philosophy and cultural understanding. Collective shadow involves dogmatism and cultural imperialism; light involves wisdom and authentic meaning. Your transformative mission involves evolving how humanity finds truth and creates meaning.",

    Capricorn: "With Pluto in Capricorn, your generation transforms authority, structure, and achievement. You revolutionize government, business, and societal organization. Collective shadow involves corrupt power structures; light involves integrity and conscious leadership. Your transformative mission involves evolving societal structures and responsible authority.",

    Aquarius: "Pluto in Aquarius transforms community, innovation, and human potential. Your generation revolutionizes collective consciousness and progress. Collective shadow involves technological control and dehumanization; light involves conscious evolution and authentic freedom. Your transformative mission involves quantum leaps in human consciousness and social organization.",

    Pisces: "With Pluto in Pisces, your generation transforms spirituality, compassion, and unity. You revolutionize transcendence and dissolution. Collective shadow involves spiritual bypassing and victimhood; light involves grounded mysticism and compassionate empowerment. Your transformative mission involves evolving consciousness toward unity while honoring individuality."
  }
};

/**
 * Get interpretation for a planet in a specific sign
 */
export function getPlanetInSignInterpretation(planet: string, sign: ZodiacSign): string {
  return PLANET_IN_SIGN_INTERPRETATIONS[planet]?.[sign] ||
    `Interpretation for ${planet} in ${sign} is being developed.`;
}
