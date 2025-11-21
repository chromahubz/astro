/**
 * Comprehensive Zodiac Sign Encyclopedia
 * Detailed descriptions of all 12 zodiac signs covering personality, traits, and characteristics
 */

import { ZodiacSign } from '../zodiac';

export interface ZodiacSignDescription {
  sign: ZodiacSign;
  glyph: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  modality: 'Cardinal' | 'Fixed' | 'Mutable';
  rulingPlanet: string;
  dateRange: string;

  // Comprehensive descriptions
  overview: string;
  coreTraits: string;
  strengths: string;
  challenges: string;
  inRelationships: string;
  inCareer: string;
  growthPath: string;
}

export const ZODIAC_SIGN_ENCYCLOPEDIA: Record<ZodiacSign, ZodiacSignDescription> = {
  Aries: {
    sign: 'Aries',
    glyph: '♈',
    element: 'Fire',
    modality: 'Cardinal',
    rulingPlanet: 'Mars',
    dateRange: 'March 21 - April 19',

    overview: "Aries is the first sign of the zodiac, representing the spark of life, initiative, and the courage to begin. As a Cardinal Fire sign ruled by Mars, Aries embodies pure action, direct expression, and pioneering spirit. This sign is the warrior, the leader, and the trailblazer who charges forth with enthusiasm and confidence. Aries energy is about self-assertion, independence, and the drive to make one's mark on the world through bold action and authentic self-expression.",

    coreTraits: "Courageous, energetic, pioneering, direct, competitive, honest, impulsive, passionate, independent, and action-oriented. Aries natives are natural leaders who prefer to initiate rather than follow. They approach life with childlike enthusiasm and aren't afraid to take risks. Their directness can be refreshing, and their courage inspires others to take action. They live in the present moment and respond to life immediately and instinctively.",

    strengths: "Exceptional courage and willingness to face challenges head-on. Natural leadership abilities and capacity to inspire others to action. Honest and straightforward communication - you always know where you stand with an Aries. High energy and enthusiasm that can revitalize any situation. Independence and self-sufficiency. Quick decision-making ability. Pioneering spirit that opens new paths. Physical vitality and athletic ability. Authenticity and lack of pretense.",

    challenges: "Impulsiveness and tendency to act before thinking. Impatience with slower processes or people. Difficulty with completion - better at starting than finishing. Tendency toward selfishness or self-focus. Hot temper that flares quickly (though also cools quickly). Resistance to authority or being told what to do. Can be too competitive or combative. Difficulty with subtlety or indirect communication. May lack awareness of others' feelings in pursuit of goals.",

    inRelationships: "Aries brings passion, excitement, and directness to relationships. They love the chase and the initial excitement of romance. Honest and straightforward, they say what they mean and appreciate the same in return. They need independence even within partnership and don't do well with clingy or dependent partners. Aries can be generous and protective of loved ones but may need to work on patience and considering their partner's needs. They're exciting partners who keep relationships dynamic and alive, though they may struggle with the mundane aspects of long-term commitment.",

    inCareer: "Aries excels in careers that allow autonomy, leadership, and action. They thrive as entrepreneurs, athletes, military leaders, surgeons, firefighters, or any role requiring courage and quick decision-making. They need work that challenges them and allows them to pioneer or compete. Routine and bureaucracy frustrate them. They're excellent at starting projects and companies but may need support with follow-through. Sales, emergency services, competitive sports, and any field allowing them to be first or best suits their nature.",

    growthPath: "Aries' evolution involves learning patience without losing urgency, and considering others without losing self. The challenge is to develop follow-through and persistence while maintaining their natural enthusiasm. Learning to pick battles wisely and to pause before reacting serves their highest good. Developing empathy and awareness of others' perspectives enriches their relationships. Their path involves understanding that true courage sometimes means patience, and real strength includes gentleness. Mastering their warrior energy to defend the vulnerable rather than simply assert themselves represents their highest expression."
  },

  Taurus: {
    sign: 'Taurus',
    glyph: '♉',
    element: 'Earth',
    modality: 'Fixed',
    rulingPlanet: 'Venus',
    dateRange: 'April 20 - May 20',

    overview: "Taurus is the second sign of the zodiac, representing stability, sensuality, and the cultivation of resources and beauty. As a Fixed Earth sign ruled by Venus, Taurus embodies the principle of manifestation - taking raw potential and creating tangible, lasting value. This sign is the builder, the gardener, and the sensualist who understands that real security comes from patient, steady effort. Taurus energy is about grounding spiritual principles in physical reality and appreciating the beauty of the natural world.",

    coreTraits: "Reliable, patient, practical, devoted, responsible, stable, sensual, appreciative of beauty, persistent, and grounded. Taurus natives have a natural affinity for the physical world and understand quality and value. They take their time making decisions but once committed, they're unwavering. Their connection to the senses makes them excellent at creating comfort and beauty. They're the ones you can count on - steady, dependable, and present.",

    strengths: "Exceptional reliability and follow-through on commitments. Deep appreciation for beauty, quality, and craftsmanship. Patient persistence that achieves long-term goals. Practical wisdom and common sense. Ability to create security and stability. Loyalty to people, values, and commitments. Sensual appreciation that brings pleasure to everyday life. Financial acumen and ability to build resources. Physical strength and endurance. Grounding presence that calms others.",

    challenges: "Stubbornness and resistance to change even when change is beneficial. Possessiveness regarding people, objects, or situations. Tendency toward materialism or overemphasis on physical security. Difficulty letting go of what no longer serves. Can be overly cautious or risk-averse. Tendency to stay in comfort zone even at the cost of growth. May indulge excessively in sensual pleasures. Slowness to adapt to new circumstances. Can be inflexible in opinions or methods.",

    inRelationships: "Taurus brings steadfast loyalty, sensuality, and devotion to relationships. They love through consistent presence and creating physical comfort for their partners. Affectionate and demonstrative, they express love through touch, gifts, and acts of service. They need security in relationships and don't do well with instability or drama. Jealousy and possessiveness can be challenges. Once committed, they're in for the long haul and expect the same from partners. They create beautiful, comfortable homes and take pleasure in sharing physical and aesthetic experiences with loved ones.",

    inCareer: "Taurus excels in careers involving tangible results, beauty, or financial management. They thrive as artists, musicians, chefs, gardeners, architects, bankers, real estate developers, or luxury goods professionals. Any work involving quality, craftsmanship, or the senses suits them. They're excellent at building businesses slowly and steadily. Finance, agriculture, food industry, interior design, and nature-based work align with their abilities. They need work that produces real, lasting value and allows them to use their hands or senses.",

    growthPath: "Taurus' evolution involves learning flexibility without losing stability, and trusting change without losing security. Their challenge is to develop adaptability while maintaining their grounding. Learning when persistence becomes stubbornness and when security becomes stagnation serves their growth. Developing non-attachment to material things while still appreciating beauty deepens their wisdom. Their path involves understanding that true security comes from within, and that change is natural. Mastering the art of letting go when necessary while building what lasts represents their highest expression."
  },

  Gemini: {
    sign: 'Gemini',
    glyph: '♊',
    element: 'Air',
    modality: 'Mutable',
    rulingPlanet: 'Mercury',
    dateRange: 'May 21 - June 20',

    overview: "Gemini is the third sign of the zodiac, representing communication, curiosity, and the exchange of information. As a Mutable Air sign ruled by Mercury, Gemini embodies mental agility, versatility, and the joy of learning. This sign is the messenger, the networker, and the eternal student who connects people, ideas, and information. Gemini energy is about gathering diverse knowledge, making connections, and adapting to changing circumstances through mental flexibility.",

    coreTraits: "Curious, communicative, versatile, quick-witted, adaptable, intellectual, social, playful, restless, and multifaceted. Gemini natives have active minds that constantly seek new information and experiences. They're natural communicators who can talk to anyone about anything. Their adaptability allows them to navigate diverse situations with ease. They see multiple perspectives and can hold several ideas simultaneously. Youthful energy characterizes their approach regardless of age.",

    strengths: "Exceptional communication and articulation abilities. Mental agility and quick learning capacity. Versatility and ability to multitask effectively. Social ease and capacity to connect with diverse people. Wit and humor that lighten difficult situations. Adaptability to changing circumstances. Objectivity and ability to see multiple perspectives. Curiosity that leads to broad knowledge. Youthful enthusiasm and playfulness. Skill at networking and making connections.",

    challenges: "Scattered energy and difficulty maintaining focus on one thing. Tendency toward superficiality - breadth without depth. Restlessness and boredom with routine. Inconsistency in follow-through on commitments. Can be overly mental and disconnected from emotions. Tendency to gossip or spread information without discretion. Nervousness and mental anxiety from overstimulation. Difficulty making decisions due to seeing too many options. May lack grounding or physical presence. Tendency to intellectualize rather than feel.",

    inRelationships: "Gemini brings intellectual stimulation, variety, and playful communication to relationships. They need mental connection and conversation to feel close to partners. Verbal expression is their primary love language. They get bored easily and need partners who keep things interesting. Emotional depth can be challenging - they prefer to talk about feelings rather than deeply feel them. They're charming, witty partners who make relationships fun and dynamic. Freedom and variety within relationship are essential - they don't do well with possessiveness or heavy emotional demands.",

    inCareer: "Gemini excels in careers involving communication, information, or variety. They thrive as journalists, writers, teachers, salespeople, translators, public relations specialists, social media managers, or any role requiring verbal skills. They need work that provides mental stimulation and variety. Routine and repetition bore them. Multiple part-time jobs or diverse responsibilities suit them better than single-focus careers. Media, education, telecommunications, transportation, and any field involving information exchange aligns with their abilities.",

    growthPath: "Gemini's evolution involves developing depth without losing breadth, and commitment without losing freedom. Their challenge is to focus scattered energy while maintaining their versatility. Learning to complete what they start and to go deep rather than just wide serves their development. Developing emotional intelligence and body awareness balances their mental orientation. Their path involves understanding that wisdom requires not just gathering information but integrating it. Mastering the art of meaningful communication rather than just clever talk represents their highest expression."
  },

  Cancer: {
    sign: 'Cancer',
    glyph: '♋',
    element: 'Water',
    modality: 'Cardinal',
    rulingPlanet: 'Moon',
    dateRange: 'June 21 - July 22',

    overview: "Cancer is the fourth sign of the zodiac, representing home, family, and emotional security. As a Cardinal Water sign ruled by the Moon, Cancer embodies nurturing, emotional depth, and the creation of safe containers for growth. This sign is the mother, the protector, and the keeper of memories who understands that true security comes from emotional connection and creating sanctuary. Cancer energy is about feeling deeply, caring for others, and honoring the past while creating emotional foundations for the future.",

    coreTraits: "Nurturing, sensitive, intuitive, protective, emotional, loyal, traditional, domestic, caring, and nostalgic. Cancer natives feel everything deeply and have remarkable emotional intelligence. They're natural caretakers who create safe spaces for others. Their intuition is powerful, and they often sense others' needs before they're expressed. Home and family (biological or chosen) are central to their wellbeing. They remember everything - emotions, experiences, and histories.",

    strengths: "Exceptional emotional intelligence and empathy. Natural nurturing and caregiving abilities. Strong intuition that guides decisions. Loyalty and devotion to loved ones. Ability to create warm, safe environments. Tenacity and determination once emotionally invested. Excellent memory, especially for emotional experiences. Protective instinct that defends the vulnerable. Domestic skills and homemaking abilities. Connection to roots and history that provides wisdom.",

    challenges: "Excessive emotional sensitivity that can lead to hurt feelings. Tendency to retreat into protective shell when wounded. Holding onto past hurts and grudges. Mood swings influenced by the Moon's phases. Difficulty letting go of people, places, or things. Can be clingy or overly dependent. Tendency toward passive-aggressive behavior rather than direct expression. Taking things too personally. May manipulate through emotional appeals. Resistance to change that threatens security.",

    inRelationships: "Cancer brings deep emotional care, loyalty, and nurturing to relationships. They love through feeding, caring for, and creating home with their partners. Family is extremely important, and they want partners who appreciate and respect their family ties. They need emotional security to open up fully. Once committed, they're devoted and expect the same loyalty in return. They can be possessive and need reassurance. Their emotional depth creates profound intimacy, though they may need to guard against moodiness affecting relationships.",

    inCareer: "Cancer excels in careers involving care, nurturing, or creating safe spaces. They thrive as counselors, nurses, teachers (especially young children), chefs, hospitality professionals, real estate agents, historians, or social workers. Any work involving caregiving, food, homes, or emotional support suits them. They're excellent at creating family-like cultures in workplaces. Roles allowing them to work from home or involving family businesses appeal to them. Healthcare, food service, childcare, and any protective profession aligns with their nature.",

    growthPath: "Cancer's evolution involves developing emotional boundaries without losing empathy, and independence without losing connection. Their challenge is to distinguish between their feelings and others' feelings. Learning to process and release emotions rather than holding them serves their wellbeing. Developing emotional self-sufficiency while maintaining their caring nature creates balance. Their path involves understanding that true security comes from within, not from external circumstances. Mastering the art of self-nurturing and letting others take care of them sometimes represents their highest expression."
  },

  Leo: {
    sign: 'Leo',
    glyph: '♌',
    element: 'Fire',
    modality: 'Fixed',
    rulingPlanet: 'Sun',
    dateRange: 'July 23 - August 22',

    overview: "Leo is the fifth sign of the zodiac, representing creative self-expression, joy, and the radiance of the heart. As a Fixed Fire sign ruled by the Sun, Leo embodies confidence, generosity, and the courage to shine authentically. This sign is the king/queen, the performer, and the creative force who understands that life is meant to be celebrated and that everyone deserves to be seen and appreciated for who they are. Leo energy is about expressing your unique essence, inspiring others, and leading from the heart.",

    coreTraits: "Confident, generous, creative, warm-hearted, dramatic, loyal, dignified, playful, proud, and inspiring. Leo natives have natural charisma and presence that draws attention. They're creative in all areas of life and need to express themselves authentically. Their warmth and generosity make others feel special. They have strong sense of self and take pride in their accomplishments. They're natural performers who light up any room they enter.",

    strengths: "Exceptional confidence and self-assurance. Natural leadership that inspires loyalty. Generous spirit and big-heartedness. Creative talent and expressive abilities. Warmth that makes others feel valued. Courage to be authentic and vulnerable. Playfulness and ability to enjoy life. Loyalty and fierce protection of loved ones. Dignity and regal bearing. Ability to uplift and encourage others.",

    challenges: "Excessive need for attention and validation. Pride that can become arrogance. Difficulty accepting criticism or admitting mistakes. Can be domineering or bossy. Tendency toward self-centeredness. Need to be in control or center of attention. Can be overly dramatic or theatrical. Stubbornness about being right. May sulk if not appreciated. Difficulty sharing spotlight or glory.",

    inRelationships: "Leo brings passion, romance, and generous love to relationships. They love grandly and expect to be adored in return. They're loyal and protective, treating partners like royalty but expecting royal treatment themselves. Romance and celebration are important - they keep relationships exciting and fun. They need appreciation and admiration from partners. Can be possessive and jealous. They're warm-hearted and make partners feel special, though they need to share the spotlight sometimes. Grand gestures and dramatic displays of affection characterize their style.",

    inCareer: "Leo excels in careers allowing creative expression, leadership, or recognition. They thrive as performers, artists, executives, teachers, politicians, event planners, or any role putting them in the spotlight. They need work that allows them to express their unique talents and be appreciated for them. Entertainment, luxury industries, creative fields, leadership positions, and work with children or involving play suits their nature. They're excellent at inspiring teams and creating positive, celebratory work environments.",

    growthPath: "Leo's evolution involves learning humility without losing confidence, and sharing the stage without dimming their light. Their challenge is to develop awareness of others' needs and contributions while still expressing themselves. Learning to accept criticism as growth opportunity rather than personal attack serves their development. Developing secure self-worth that doesn't require constant external validation deepens their power. Their path involves understanding that true leadership serves others and that the greatest kings and queens use their power to empower others. Mastering generous leadership from the heart represents their highest expression."
  },

  Virgo: {
    sign: 'Virgo',
    glyph: '♍',
    element: 'Earth',
    modality: 'Mutable',
    rulingPlanet: 'Mercury',
    dateRange: 'August 23 - September 22',

    overview: "Virgo is the sixth sign of the zodiac, representing service, improvement, and practical wisdom. As a Mutable Earth sign ruled by Mercury, Virgo embodies discernment, analysis, and the dedication to making things better. This sign is the healer, the craftsperson, and the analyst who understands that excellence comes through attention to detail and that true service makes the world function better. Virgo energy is about refining, purifying, and bringing order to chaos through intelligent application of skill.",

    coreTraits: "Analytical, practical, helpful, modest, precise, health-conscious, diligent, discerning, organized, and perfectionist. Virgo natives have keen eye for detail and natural drive to improve everything they touch. They're dedicated workers who take pride in craftsmanship and useful service. Their analytical minds solve practical problems efficiently. They're modest and prefer to work behind the scenes. They notice what others miss and have high standards for themselves and their work.",

    strengths: "Exceptional analytical and problem-solving abilities. Attention to detail that ensures quality and accuracy. Dedication to service and helping others. Practical wisdom and common sense. Organizational skills and ability to create efficient systems. Health consciousness and body awareness. Humility and lack of ego. Craftsmanship and skill development. Discernment that distinguishes quality from mediocrity. Reliability and thoroughness in all tasks.",

    challenges: "Excessive self-criticism and harsh judgment of self. Perfectionism that prevents completion or enjoyment. Tendency to criticize or find fault with others. Anxiety and worry about details. Difficulty relaxing or doing things imperfectly. Can be overly controlling about how things are done. Health anxiety or hypochondria. Tendency to serve others while neglecting own needs. Difficulty seeing the big picture due to focus on details. May struggle with spontaneity or letting go.",

    inRelationships: "Virgo brings devoted service, practical support, and careful attention to relationships. They show love through acts of service and taking care of partners' needs. They're modest and sometimes struggle to express emotions verbally. They're loyal and dedicated once committed. Can be critical or have high standards for partners. They need to feel useful in relationships and may overdo caretaking. Appreciating their quiet devotion and practical help is important. They may need encouragement to relax perfectionism in intimacy.",

    inCareer: "Virgo excels in careers involving analysis, health, service, or detailed work. They thrive as healthcare professionals, editors, accountants, craftspeople, nutritionists, researchers, administrators, or quality control specialists. Any work requiring precision, organization, or improvement of systems suits them. Healthcare, writing and editing, environmental services, social services, and administrative roles align with their abilities. They're excellent at refining processes and ensuring things run smoothly.",

    growthPath: "Virgo's evolution involves learning acceptance without losing discernment, and self-compassion without losing dedication to excellence. Their challenge is to apply their high standards with kindness rather than criticism. Learning when good enough is truly good enough and releasing perfectionism serves their wellbeing. Developing trust in natural processes and acceptance of imperfection creates peace. Their path involves understanding that wholeness includes what they judge as imperfect. Mastering the art of sacred service that honors both giver and receiver represents their highest expression."
  },

  Libra: {
    sign: 'Libra',
    glyph: '♎',
    element: 'Air',
    modality: 'Cardinal',
    rulingPlanet: 'Venus',
    dateRange: 'September 23 - October 22',

    overview: "Libra is the seventh sign of the zodiac, representing partnership, balance, and aesthetic harmony. As a Cardinal Air sign ruled by Venus, Libra embodies diplomacy, fairness, and the creation of beauty and peace. This sign is the diplomat, the artist, and the partner who understands that life is better shared and that beauty and justice make the world livable. Libra energy is about creating harmony between opposing forces, seeing all perspectives, and bringing grace and beauty to human interaction.",

    coreTraits: "Diplomatic, charming, fair-minded, social, aesthetic, partnership-oriented, balanced, gracious, indecisive, and justice-seeking. Libra natives naturally see all sides of every situation and seek fairness. They have exquisite taste and create beauty wherever they go. Relationships are central to their existence - they feel most themselves when partnered. Their social grace and charm make others feel comfortable. They're natural mediators who bridge divides.",

    strengths: "Exceptional diplomacy and mediation abilities. Natural sense of fairness and justice. Aesthetic sense and ability to create beauty. Social grace and charm that ease interactions. Ability to see multiple perspectives objectively. Partnership skills and cooperative nature. Balanced thinking and decision-making. Talent for creating harmony in conflicts. Romantic nature and appreciation for love. Refined taste and cultural sophistication.",

    challenges: "Indecisiveness from seeing too many sides. People-pleasing and difficulty saying no. Avoidance of conflict even when necessary. Can be superficial or overly concerned with appearance. Tendency to lose self in relationships. Difficulty making decisions independently. May manipulate through charm rather than direct communication. Can be vain or overly focused on beauty. Dependency on others for validation. Difficulty being alone or independent.",

    inRelationships: "Libra brings romance, harmony, and partnership focus to relationships. They're natural partners who feel complete when coupled. They're charming, attentive, and make partners feel appreciated. Fairness and equality in relationships matter deeply. They avoid conflict and may suppress their needs to keep peace. They create beautiful, harmonious environments and enjoy sharing cultural and aesthetic experiences. They need partnership and may jump from relationship to relationship rather than be alone. Learning to maintain identity within partnership is crucial.",

    inCareer: "Libra excels in careers involving beauty, justice, or partnership. They thrive as diplomats, mediators, artists, designers, counselors, lawyers, human resources professionals, or event planners. Any work involving aesthetics, relationships, or creating harmony suits them. Fashion, arts, law, counseling, hospitality, and partnership-based businesses align with their abilities. They're excellent at client relations and creating beautiful, balanced work environments.",

    growthPath: "Libra's evolution involves developing independent decision-making without losing consideration for others, and assertiveness without losing diplomacy. Their challenge is to maintain their identity and needs within relationships. Learning when harmony requires addressing conflict rather than avoiding it serves their growth. Developing comfort with being alone and making choices without consensus deepens their strength. Their path involves understanding that true balance includes both self and other. Mastering the art of conscious partnership that enhances rather than completes them represents their highest expression."
  },

  Scorpio: {
    sign: 'Scorpio',
    glyph: '♏',
    element: 'Water',
    modality: 'Fixed',
    rulingPlanet: 'Pluto',
    dateRange: 'October 23 - November 21',

    overview: "Scorpio is the eighth sign of the zodiac, representing transformation, depth, and regeneration. As a Fixed Water sign ruled by Pluto, Scorpio embodies intensity, power, and the courage to face life's deepest mysteries. This sign is the shaman, the detective, and the phoenix who understands that real growth requires death and rebirth. Scorpio energy is about diving beneath surfaces, transforming through crisis, and accessing power through emotional and psychological depth.",

    coreTraits: "Intense, passionate, powerful, perceptive, mysterious, determined, loyal, investigative, transformative, and magnetic. Scorpio natives feel everything profoundly and have little interest in superficiality. They see through facades and understand hidden motivations. Their emotional power is tremendous, and they're capable of complete transformation. They're fiercely loyal to those they trust and equally fierce toward those who betray them. Mystery and depth characterize their approach to life.",

    strengths: "Exceptional depth and capacity for transformation. Penetrating insight into hidden dimensions. Unwavering determination and willpower. Loyalty and devotion once trust is established. Emotional courage to face difficult truths. Ability to handle crisis and extremes. Magnetic presence and charisma. Investigative skills and perceptiveness. Capacity for profound intimacy and merging. Regenerative power and resilience.",

    challenges: "Tendency toward jealousy, possessiveness, and control. Difficulty trusting and letting guard down. Can be manipulative or power-hungry. Holding grudges and seeking revenge. All-or-nothing thinking and behavior. Tendency to test others' loyalty. Can be secretive or withholding. Difficulty with vulnerability and emotional openness. May use emotional intensity to control. Obsessive or compulsive tendencies.",

    inRelationships: "Scorpio brings profound depth, passion, and transformative intimacy to relationships. They love completely and intensely, with total commitment. They need deep emotional and sexual connection - superficial relationships don't satisfy them. Trust is everything and takes time to establish. Once betrayed, forgiveness is difficult. They can be possessive and jealous. They want to merge completely with partners and may struggle with appropriate boundaries. Their passion and loyalty create powerful bonds, though they need to release control and trust.",

    inCareer: "Scorpio excels in careers involving depth, investigation, or transformation. They thrive as psychologists, researchers, detectives, surgeons, therapists, financial analysts, or any role requiring penetrating insight. Work involving secrets, mysteries, or taboo subjects suits them. They're excellent at crisis management and transforming failing situations. Psychology, medicine, investigation, occult sciences, finance (especially shared resources), and regenerative work aligns with their nature.",

    growthPath: "Scorpio's evolution involves learning to trust without controlling, and to share power rather than dominate. Their challenge is to transform their own darkness and wounds before trying to transform others. Learning to release and forgive serves their soul's growth. Developing transparency and vulnerability alongside their natural privacy deepens their power. Their path involves understanding that true power comes from surrender and that transformation requires letting go of what was. Mastering the art of conscious use of power for healing represents their highest expression."
  },

  Sagittarius: {
    sign: 'Sagittarius',
    glyph: '♐',
    element: 'Fire',
    modality: 'Mutable',
    rulingPlanet: 'Jupiter',
    dateRange: 'November 22 - December 21',

    overview: "Sagittarius is the ninth sign of the zodiac, representing expansion, wisdom, and the search for meaning. As a Mutable Fire sign ruled by Jupiter, Sagittarius embodies optimism, adventure, and the quest for truth. This sign is the philosopher, the explorer, and the teacher who understands that life's purpose is to grow, expand consciousness, and discover truth. Sagittarius energy is about seeking higher understanding, broadening horizons, and sharing wisdom with infectious enthusiasm.",

    coreTraits: "Optimistic, adventurous, philosophical, honest, freedom-loving, enthusiastic, expansive, idealistic, restless, and truth-seeking. Sagittarius natives have insatiable appetite for knowledge, experience, and meaning. They're natural philosophers who see the big picture. Their optimism is infectious and their enthusiasm inspiring. They need freedom like air and resist any restriction. They speak truth bluntly and expect the same honesty from others. They're always looking toward the next horizon.",

    strengths: "Exceptional optimism and faith in possibilities. Philosophical wisdom and big-picture thinking. Honesty and straightforward communication. Enthusiasm that inspires others. Love of learning and intellectual curiosity. Adventurous spirit and willingness to take risks. Generosity and magnanimous nature. Ability to find meaning and silver linings. Cultural openness and love of diversity. Natural teaching and sharing of knowledge.",

    challenges: "Tactlessness and brutal honesty that hurts feelings. Overextension and taking on too much. Restlessness and difficulty with commitment or routine. Can be dogmatic about beliefs while claiming open-mindedness. Tendency toward excess and overindulgence. Difficulty with details and follow-through. May be irresponsible or make promises they can't keep. Can be preachy or self-righteous. Difficulty being present - always looking to next thing. May avoid emotional depth through philosophy.",

    inRelationships: "Sagittarius brings adventure, growth, and intellectual stimulation to relationships. They need freedom and space even within commitment. They're honest to a fault and expect the same. They want partners who share their enthusiasm for learning and exploring. They can be commitment-phobic and may run when relationships feel restrictive. They're generous and optimistic partners who keep things fun and expanding. Philosophical and cultural connection matters as much as emotional. They may need to develop emotional depth and practical reliability.",

    inCareer: "Sagittarius excels in careers involving teaching, travel, philosophy, or expansion. They thrive as professors, travel writers, guides, philosophers, coaches, entrepreneurs, or international businesspeople. Work providing freedom, meaning, and growth suits them. They need careers allowing exploration and avoiding routine. Publishing, higher education, travel industry, law, religion, sports, and outdoor adventures align with their nature. Entrepreneurship appeals as it provides freedom and growth potential.",

    growthPath: "Sagittarius' evolution involves grounding vision in practical reality without losing idealism, and developing depth without losing breadth. Their challenge is to commit and follow through while maintaining freedom. Learning that truth has many faces and that their truth isn't the only truth serves their wisdom. Developing emotional intelligence and presence alongside their mental orientation creates balance. Their path involves understanding that true freedom comes from commitment to growth rather than escape from limitation. Mastering the art of teaching through living example rather than preaching represents their highest expression."
  },

  Capricorn: {
    sign: 'Capricorn',
    glyph: '♑',
    element: 'Earth',
    modality: 'Cardinal',
    rulingPlanet: 'Saturn',
    dateRange: 'December 22 - January 19',

    overview: "Capricorn is the tenth sign of the zodiac, representing achievement, responsibility, and lasting contribution. As a Cardinal Earth sign ruled by Saturn, Capricorn embodies discipline, ambition, and the wisdom that comes through time and experience. This sign is the elder, the executive, and the builder who understands that real success requires patient, persistent effort. Capricorn energy is about climbing the mountain step by step, building structures that last, and taking responsibility for creating the world we want.",

    coreTraits: "Ambitious, disciplined, responsible, practical, patient, traditional, mature, authoritative, reserved, and goal-oriented. Capricorn natives take life seriously and are willing to work harder and longer than others. They have long-term vision and build slowly but surely toward goals. Respect, achievement, and integrity matter deeply. They're reliable and others count on them. They mature early and often feel older than their years, growing younger as they age.",

    strengths: "Exceptional discipline and self-control. Long-term vision and strategic planning. Reliability and follow-through on commitments. Ability to shoulder responsibility. Patient persistence toward goals. Practical wisdom and realism. Integrity and respect for proper structure. Leadership through competence and experience. Resilience through hardship. Ability to build lasting achievements.",

    challenges: "Excessive seriousness and difficulty with play or spontaneity. Workaholic tendencies at expense of personal life. Pessimism or negative thinking. Can be cold or emotionally distant. Difficulty expressing vulnerability or asking for help. May be overly controlling or authoritarian. Tendency to prioritize success over happiness. Can be status-conscious or materialistic. Difficulty trusting others or delegating. May suppress emotions in favor of duty.",

    inRelationships: "Capricorn brings loyalty, commitment, and steady dedication to relationships. They take partnership seriously and are in it for the long term. They show love through providing security and taking care of practical needs. Emotions may be reserved initially but run deep. They need partners who respect their ambition and don't demand constant emotional displays. They're faithful and traditional, preferring committed partnership to casual dating. They may need to work on emotional expression and making time for relationship alongside career.",

    inCareer: "Capricorn excels in careers involving leadership, structure, or long-term building. They thrive as executives, managers, architects, engineers, government officials, bankers, or any role requiring discipline and responsibility. They're willing to start at bottom and work their way up. Work is central to their identity and they take professional reputation seriously. Business, government, construction, management, finance, and traditional institutions align with their nature. They build careers that last and often achieve high status.",

    growthPath: "Capricorn's evolution involves learning to balance achievement with enjoyment, and responsibility with play. Their challenge is to develop emotional openness and vulnerability without losing strength. Learning that worth isn't earned only through accomplishment but exists inherently serves their soul. Developing trust in others and ability to delegate creates freedom. Their path involves understanding that true authority comes from wisdom and service rather than position. Mastering the art of using power responsibly to serve collective good represents their highest expression."
  },

  Aquarius: {
    sign: 'Aquarius',
    glyph: '♒',
    element: 'Air',
    modality: 'Fixed',
    rulingPlanet: 'Uranus',
    dateRange: 'January 20 - February 18',

    overview: "Aquarius is the eleventh sign of the zodiac, representing innovation, humanitarianism, and collective consciousness. As a Fixed Air sign ruled by Uranus, Aquarius embodies originality, progress, and dedication to ideals. This sign is the revolutionary, the inventor, and the visionary who understands that evolution requires breaking from the past and that individual freedom serves collective good. Aquarius energy is about innovating, awakening consciousness, and working toward a better future for all.",

    coreTraits: "Independent, innovative, humanitarian, intellectual, progressive, unconventional, friendly, idealistic, detached, and visionary. Aquarius natives think differently and aren't afraid to be unique. They're dedicated to progressive causes and improving society. Friendship is as important as romance. They're intellectually oriented and somewhat detached from emotions. They see the future and work toward it. Conformity feels like death - they must express their individuality.",

    strengths: "Exceptional originality and innovative thinking. Humanitarian ideals and dedication to collective good. Intellectual brilliance and forward-thinking. Ability to see patterns and future trends. Friendly, egalitarian approach to all people. Commitment to freedom and individual expression. Objectivity and rational thinking. Tolerance and acceptance of diversity. Technological aptitude and progressive ideas. Vision for better world.",

    challenges: "Emotional detachment and difficulty with intimacy. Can be cold or aloof. Tendency toward rebelliousness for its own sake. May be dogmatic about progressive ideals. Difficulty with traditional structures or authority. Can be unpredictable or erratic. Tendency to intellectualize rather than feel emotions. May prioritize humanity over individual people. Difficulty with commitment or convention. Can be stubborn about being different.",

    inRelationships: "Aquarius brings friendship, intellectual connection, and independence to relationships. They need partners who are friends first and respect their need for freedom. They're loyal but unconventional - traditional relationship structures may not suit them. Emotional demands can feel suffocating. They need space and autonomy even in committed relationships. They're egalitarian and treat partners as equals. They may struggle with emotional intimacy and vulnerability. They bring progressive ideas and keep relationships evolving.",

    inCareer: "Aquarius excels in careers involving innovation, technology, or humanitarian work. They thrive as inventors, scientists, social activists, technology professionals, futurists, astrologers, or community organizers. Work serving progressive causes or involving cutting-edge ideas suits them. They need freedom and resist corporate conformity. Technology, social justice, science, aerospace, alternative fields, and community work aligns with their nature. They're excellent at revolutionizing systems.",

    growthPath: "Aquarius' evolution involves developing emotional intelligence without losing objectivity, and personal intimacy without losing commitment to collective. Their challenge is to connect heart and mind, feeling and thinking. Learning that human connection requires presence, not just ideas, serves their growth. Developing patience with slower evolution of consciousness creates peace. Their path involves understanding that true revolution includes compassion and that progress serves real people. Mastering the art of conscious use of technology and innovation for human benefit represents their highest expression."
  },

  Pisces: {
    sign: 'Pisces',
    glyph: '♓',
    element: 'Water',
    modality: 'Mutable',
    rulingPlanet: 'Neptune',
    dateRange: 'February 19 - March 20',

    overview: "Pisces is the twelfth and final sign of the zodiac, representing transcendence, compassion, and unity consciousness. As a Mutable Water sign ruled by Neptune, Pisces embodies spirituality, creativity, and dissolution of boundaries. This sign is the mystic, the artist, and the healer who understands that all separation is illusion and that love and compassion transcend all divisions. Pisces energy is about connecting to the divine, serving through selfless love, and creating beauty that touches the soul.",

    coreTraits: "Compassionate, intuitive, artistic, spiritual, empathetic, dreamy, adaptable, sensitive, escapist, and transcendent. Pisces natives feel everything and everyone - boundaries between self and other are fluid. They have natural access to spiritual and creative dimensions. Their empathy is boundless and they absorb others' emotions like sponges. They're natural healers and artists who channel divine inspiration. Reality can feel harsh - they often escape into dreams, art, or spirituality.",

    strengths: "Exceptional compassion and unconditional love. Powerful intuition and psychic sensitivity. Artistic and creative genius. Spiritual connection and mystical understanding. Empathy that heals others. Ability to transcend ego and merge with divine. Adaptability and flowing with life. Selfless service and sacrifice for others. Imagination that creates beauty. Forgiveness and non-judgment.",

    challenges: "Difficulty maintaining boundaries and taking on others' problems. Tendency toward escapism through substances, fantasy, or victim mentality. Can be passive or avoid facing reality. Difficulty with practical, material world. May sacrifice self excessively for others. Can be overly impressionable or gullible. Confusion about identity or merging with others. Tendency toward martyrdom or self-pity. May avoid confrontation or difficult emotions. Difficulty with structure and discipline.",

    inRelationships: "Pisces brings unconditional love, empathy, and spiritual connection to relationships. They merge completely with partners and may lose sense of self. They're romantic idealists who want soulmate connection. They're selfless and will sacrifice for loved ones, sometimes excessively. Boundaries are challenging - they need to learn where they end and partner begins. They're compassionate and forgiving, though they may enable unhealthy behavior. They create magical, spiritual intimacy and need partners who appreciate their sensitivity.",

    inCareer: "Pisces excels in careers involving healing, art, or spiritual service. They thrive as artists, musicians, therapists, nurses, spiritual teachers, photographers, or charity workers. Work serving suffering or creating beauty suits them. They need meaningful work that touches souls, not just earns money. They struggle with corporate environments and harsh competition. Healthcare, arts, spirituality, social services, and compassionate work aligns with their nature. They channel divine inspiration into their work.",

    growthPath: "Pisces' evolution involves developing healthy boundaries without losing compassion, and grounding spiritual vision in earthly reality. Their challenge is to serve others without sacrificing themselves and to develop discernment about who deserves their energy. Learning to face reality rather than escape it serves their growth. Developing practical skills and material grounding balances their spiritual orientation. Their path involves understanding that true compassion includes self-compassion and that helping others requires maintaining their own energy. Mastering conscious channeling of spiritual and creative gifts while staying anchored in body represents their highest expression."
  }
};

/**
 * Get comprehensive description for a zodiac sign
 */
export function getZodiacSignDescription(sign: ZodiacSign): ZodiacSignDescription {
  return ZODIAC_SIGN_ENCYCLOPEDIA[sign];
}

/**
 * Get all zodiac signs in order
 */
export function getAllZodiacSignDescriptions(): ZodiacSignDescription[] {
  const signs: ZodiacSign[] = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  return signs.map(sign => ZODIAC_SIGN_ENCYCLOPEDIA[sign]);
}
