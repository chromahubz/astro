/**
 * Aspect Interpretations
 * Interpretations for planetary aspects in birth charts
 */

import { AspectType } from '../aspects';

type AspectInterpretationKey = `${string}-${string}`;

/**
 * Generate aspect key for lookup
 */
function getAspectKey(planet1: string, planet2: string, aspectType: AspectType): string {
  // Normalize planet order alphabetically for consistent lookup
  const [p1, p2] = [planet1, planet2].sort();
  return `${p1}-${p2}-${aspectType}`;
}

/**
 * Aspect interpretations organized by planet pairs and aspect type
 */
const ASPECT_INTERPRETATIONS: Record<string, string> = {
  // SUN ASPECTS
  'Sun-Moon-conjunction': "Your conscious will and emotional nature work as one unified force. What you want aligns with what you need emotionally. This creates inner harmony and self-consistency, though you may lack objectivity about yourself. Integration of masculine and feminine principles comes naturally. Your identity and emotions are inseparable.",

  'Sun-Moon-opposition': "Your conscious will and emotional needs pull in opposite directions, creating internal tension that drives growth. What you want may conflict with what makes you feel secure. This aspect brings self-awareness through relationship mirrors. Learning to honor both solar purpose and lunar needs creates wholeness. Partners often embody the opposite energy.",

  'Sun-Moon-trine': "Your will and emotions flow harmoniously together. What you desire aligns naturally with emotional fulfillment. Inner confidence and ease characterize your self-expression. While this creates natural talent and charm, it may not push you toward growth as much as challenging aspects. Life flows smoothly when you trust yourself.",

  'Sun-Moon-square': "Dynamic tension between will and emotion creates inner friction that motivates action. What you want may clash with what you need emotionally, generating creative struggle. This aspect builds character through resolving internal conflicts. Success requires integrating head and heart. Your greatest achievements come through overcoming this challenge.",

  'Sun-Moon-sextile': "Opportunities arise when you align will with feeling. Your conscious goals and emotional nature cooperate when you make effort to connect them. This aspect supports growth through gentle integration of masculine and feminine energies. Taking action on emotional insights brings success.",

  'Sun-Mercury-conjunction': "Your identity and communication are unified - you think about yourself constantly and express your will through ideas. Mental clarity about purpose comes naturally, though objectivity may be challenging. You're a natural spokesperson for your beliefs. Your mind and ego work as one.",

  'Sun-Venus-conjunction': "Charm, creativity, and self-love characterize your expression. You're naturally attractive and artistic. Love and identity merge - being loved affirms who you are. While this brings grace and beauty, vanity may need watching. Creative self-expression flows naturally and brings joy.",

  'Sun-Mars-conjunction': "Enormous willpower, courage, and drive define your approach to life. Your identity requires action and assertion. Leadership comes naturally but patience may need development. Physical vitality is high. You take initiative confidently and face challenges courageously. Your energy is direct and powerful.",

  'Sun-Mars-square': "Intense drive meets resistance, creating friction that builds strength. Your will encounters obstacles that test and refine your courage. Anger management and patience are growth areas. While challenging, this aspect creates tremendous achievement capacity through struggle. You're a fighter.",

  'Sun-Mars-trine': "Confidence and action flow naturally together. You take initiative easily and assert yourself without hesitation. Physical vitality is excellent and leadership comes naturally. While success comes easily, challenge may be needed to develop full potential. Courage is instinctive.",

  'Sun-Jupiter-conjunction': "Optimism, faith, and expansion characterize your identity. You approach life with enthusiasm and attract opportunities. Teaching and inspiring others comes naturally. While your confidence is admirable, watch for overextension. Growth and meaning are essential to your well-being.",

  'Sun-Jupiter-trine': "Fortune flows naturally toward you. Confidence and opportunities align harmoniously. Teaching, traveling, and growth come easily. While blessed, you may take success for granted. Your faith in life attracts abundance. Generosity and optimism define your approach.",

  'Sun-Jupiter-square': "Expansive impulses meet reality checks. Your confidence may exceed current capacity, driving growth through overreach. Success requires tempering optimism with realism. While challenging, this aspect creates achievement through learning limits. Moderation brings wisdom.",

  'Sun-Saturn-conjunction': "Responsibility and identity merge. You take yourself seriously and mature early. Authority comes with time and earned respect. While early confidence may be challenged, lasting achievement builds through discipline. Your purpose involves mastery and building something enduring.",

  'Sun-Saturn-square': "Your will meets restriction, creating growth through limitation. Authority figures may challenge your expression. While difficult, this aspect builds exceptional character and achievement. Success comes through persistence despite obstacles. You earn everything you achieve.",

  'Sun-Saturn-trine': "Discipline and purpose flow naturally together. You build success patiently and take responsibility easily. Authority respects you and you respect proper structure. Achievement comes through sustained effort. Maturity and wisdom characterize your expression.",

  'Sun-Uranus-conjunction': "Originality and independence define your identity. You cannot conform - your will demands freedom and innovation. Sudden insights and changes characterize your path. While your uniqueness is your gift, grounding brilliance serves practical goals. You're meant to revolutionize something.",

  'Sun-Uranus-trine': "Innovation and individuality flow naturally. Original ideas come easily and you express uniqueness confidently. Freedom and progress align with your purpose. Change comes smoothly when needed. Your progressive nature attracts opportunities.",

  'Sun-Uranus-square': "Revolutionary impulses clash with ego, creating erratic self-expression. Rebellion and sudden changes challenge stability. While difficult, this creates breakthrough innovation through disruption. Freedom requires conscious integration with purpose. You're learning to channel lightning.",

  'Sun-Neptune-conjunction': "Spirituality and imagination infuse your identity. Boundaries dissolve between self and transcendent. Creative and healing gifts are natural, but clarity about ego needs development. Your purpose may involve art, spirituality, or service. Grounding idealism serves manifestation.",

  'Sun-Neptune-square': "Ego boundaries are challenged by spiritual or imaginative forces. Confusion about identity or purpose may arise. While difficult, this creates compassionate dissolution of false self. Clarity requires grounding transcendent experience. You're learning to honor both human and divine.",

  'Sun-Neptune-trine': "Creativity and spirituality flow naturally through you. Artistic and healing gifts express easily. Compassion and imagination characterize your identity. While blessed with inspiration, practical manifestation may need development. Your purpose involves channeling beauty or healing.",

  'Sun-Pluto-conjunction': "Intense transformative power characterizes your identity. Crisis and rebirth are familiar. You cannot be casual or superficial - depth is your nature. While your power is impressive, using it wisely matters. Your purpose involves profound transformation of self and others.",

  'Sun-Pluto-square': "Ego encounters transformative crises that recreate identity. Power struggles teach about authentic strength. While intensely challenging, this builds exceptional resilience and depth. Your will is tested and refined through extremity. Transformation through conflict is your path.",

  'Sun-Pluto-trine': "Transformative power flows naturally through you. You regenerate easily and help others transform. Depth and intensity characterize your expression without overwhelming you. While powerful, conscious use of influence matters. Your purpose involves facilitating profound change.",

  // MOON ASPECTS
  'Moon-Mercury-conjunction': "Emotions and thoughts blend completely. You think about your feelings and feel your thoughts. Communication is emotionally intelligent. While this creates empathy and intuitive understanding, objectivity may be challenging. Your mind processes through emotional filters.",

  'Moon-Mercury-square': "Tension between feeling and thinking creates internal dialogue. Head and heart may disagree, generating creative friction. While challenging, this builds capacity to bridge emotion and reason. Integration of both serves whole intelligence.",

  'Moon-Mercury-trine': "Emotions and thoughts flow harmoniously. You understand feelings mentally and express emotions articulately. Emotional intelligence comes naturally. Communication is both clear and empathetic. This supports counseling, teaching, or any work bridging heart and mind.",

  'Moon-Venus-conjunction': "Emotional and aesthetic needs merge beautifully. You need beauty and love to feel secure. Artistic sensitivity is high and relationships are emotionally important. While this creates charm and grace, emotional neediness in relationship may need awareness.",

  'Moon-Venus-trine': "Emotions and love flow harmoniously. Relationships bring emotional fulfillment naturally. Artistic expression is emotionally satisfying. While blessed with emotional and aesthetic gifts, taking them for granted may limit growth. You create beauty and harmony easily.",

  'Moon-Mars-conjunction': "Emotional energy is direct and immediate. You act on feelings instinctively. While this creates emotional courage and honesty, anger may arise quickly. Emotional needs demand satisfaction. Your feelings have urgency and power.",

  'Moon-Mars-square': "Emotional needs clash with assertive impulses. Anger and nurturing conflict internally. While challenging, this creates powerful emotional energy when integrated. Learning to honor both sensitivity and strength develops emotional mastery.",

  'Moon-Mars-trine': "Emotional needs and action align naturally. You assert yourself comfortably and act on feelings confidently. Emotional courage comes easily. While this supports healthy assertion, awareness of others' sensitivity matters.",

  'Moon-Jupiter-conjunction': "Emotional generosity and optimism characterize your nature. You need growth and meaning to feel secure. Emotional faith sustains you through difficulty. While your emotional abundance is beautiful, boundaries prevent overwhelm from others' needs.",

  'Moon-Jupiter-trine': "Emotions and expansion flow harmoniously. Optimism comes naturally and emotional generosity flows easily. You attract emotional abundance. While blessed, gratitude deepens already fortunate emotional life.",

  'Moon-Saturn-conjunction': "Emotional reserve and control characterize your feeling nature. You may have experienced early emotional restriction. While challenging, this builds emotional maturity and resilience. Learning to express vulnerability with safe people heals.",

  'Moon-Saturn-square': "Emotional needs meet restriction and fear. Feeling vulnerable may be difficult. While painful, this builds exceptional emotional strength through accepting limitation. Self-nurturing and patience heal emotional wounds.",

  'Moon-Saturn-trine': "Emotional stability and maturity flow naturally. You manage feelings well and create security patiently. Emotional discipline serves without suppression. Reliable and steady emotional nature provides foundation for others.",

  'Moon-Uranus-conjunction': "Emotional independence and uniqueness define your feeling nature. You need freedom emotionally and feel things suddenly. While liberating, emotional stability may need conscious development. Your emotional nature is brilliantly original.",

  'Moon-Uranus-square': "Emotional needs for security clash with need for freedom. Instability challenges emotional life. While difficult, this creates emotional awakening through disruption. Learning to ground electric feelings serves emotional well-being.",

  'Moon-Neptune-conjunction': "Emotional boundaries dissolve into universal compassion. You feel everything and everyone. While your empathy is profound, discernment about what's yours emotionally matters. Spiritual and creative expression channels overwhelming sensitivity.",

  'Moon-Neptune-square': "Emotional confusion or overwhelm challenges clear feeling. Boundaries with others' emotions need development. While difficult, this creates profound compassion through emotional dissolution. Grounding transcendent feelings serves emotional health.",

  'Moon-Pluto-conjunction': "Emotional intensity and depth characterize your feeling nature. You feel everything powerfully. Emotional transformation and crisis may be familiar. While your emotional power is impressive, allowing vulnerability without control serves intimacy.",

  'Moon-Pluto-square': "Emotional needs encounter crisis and intensity. Power struggles around vulnerability arise. While extremely challenging, this creates profound emotional transformation. Healing emotional wounds releases tremendous power.",

  // MERCURY ASPECTS
  'Mercury-Venus-conjunction': "Thinking and aesthetics merge beautifully. You think about beauty, relationships, and values. Communication is charming and diplomatic. While this creates pleasant expression, speaking difficult truths may need development. Your mind appreciates harmony and art.",

  'Mercury-Mars-conjunction': "Quick thinking and direct communication characterize your mental style. You speak boldly and think competitively. While this creates mental courage, listening and patience enhance communication. Your mind is a sharp weapon.",

  'Mercury-Mars-square': "Mental energy meets resistance, creating argumentative or defensive thinking. While challenging, this builds mental courage through debate. Tempering aggression with consideration serves communication.",

  'Mercury-Jupiter-conjunction': "Expansive thinking and optimistic communication define your mental nature. You think big and express with enthusiasm. Teaching and learning come naturally. While your mental breadth is impressive, depth and accuracy matter too.",

  'Mercury-Saturn-conjunction': "Serious, methodical thinking characterizes your mind. You think carefully and speak with authority. While this creates mental discipline, allowing spontaneity and lightness enriches thinking. Your words carry weight.",

  'Mercury-Uranus-conjunction': "Brilliant, innovative thinking defines your mental nature. Original ideas come in flashes. While genius is possible, grounding insights practically serves manifestation. Your mind is electric and revolutionary.",

  'Mercury-Neptune-conjunction': "Imaginative, intuitive thinking characterizes your mind. You think in images and symbols. While creative genius is possible, clarity and grounding serve communication. Your mind accesses transcendent dimensions.",

  'Mercury-Pluto-conjunction': "Penetrating, investigative thinking defines your mental nature. You see through surface to hidden truth. While your insight is powerful, sharing perceptions compassionately serves communication. Your mind transforms what it touches.",

  // VENUS ASPECTS
  'Venus-Mars-conjunction': "Love and desire merge powerfully. Passion and romance are intense. Artistic creativity flows through you. While your magnetic attraction is strong, balance between giving and taking serves relationship. You love with your whole being.",

  'Venus-Mars-square': "Desire and love clash, creating passionate tension. What you want may conflict with what brings harmony. While challenging, this creates dynamic attraction and creative passion. Integration of Mars and Venus energies serves fulfillment.",

  'Venus-Mars-trine': "Love and desire flow harmoniously. Passion and harmony align naturally. Relationships satisfy both romantic and sexual needs. Creative expression is both beautiful and powerful. You attract and create with ease.",

  'Venus-Jupiter-conjunction': "Love expands generously. Romance is abundant and optimistic. While your capacity for joy and generosity is beautiful, moderation in pleasure serves well-being. You attract abundance in love and resources.",

  'Venus-Jupiter-trine': "Love and expansion flow harmoniously. Relationships bring growth and joy naturally. Artistic and romantic abundance comes easily. Gratitude deepens already fortunate capacity for love and beauty.",

  'Venus-Saturn-conjunction': "Love requires commitment and maturity. Romance may develop slowly but lasts. While challenging initially, this creates enduring partnerships through patient dedication. Quality matters more than quantity in love.",

  'Venus-Saturn-square': "Love meets restriction and fear. Relationships may be tested or delayed. While painful, this creates mature love through overcoming fear of rejection. Self-love heals.",

  'Venus-Uranus-conjunction': "Love requires freedom and excitement. Conventional relationships may not satisfy. While your capacity for unique love is refreshing, commitment may need conscious development. You love unconventionally and brilliantly.",

  'Venus-Neptune-conjunction': "Love is spiritual and transcendent. Romance is idealized and compassionate. While your capacity for unconditional love is beautiful, seeing partners clearly prevents disappointment. Your love dissolves boundaries.",

  'Venus-Pluto-conjunction': "Love is intense, transformative, and all-consuming. Passion is profound and relationships transform you. While your depth is impressive, allowing lightness serves balance. You love with tremendous power.",

  'Venus-Pluto-square': "Love encounters crisis and intensity. Power struggles in relationship arise. While extremely challenging, this creates profound transformation through relationship. Healing deepens capacity for true intimacy.",

  // MARS ASPECTS
  'Mars-Jupiter-conjunction': "Drive and expansion merge powerfully. You act with confidence and faith. While your enthusiasm is impressive, tempering impulsiveness with wisdom serves success. Your energy is abundant and optimistic.",

  'Mars-Jupiter-square': "Action exceeds wisdom temporarily. Overconfidence may lead to overextension. While challenging, this creates growth through learning limits. Moderation between enthusiasm and realism serves achievement.",

  'Mars-Saturn-conjunction': "Drive meets discipline. You act with patience and control. While this creates sustained effort, allowing spontaneity and accepting limitation serves well-being. Your endurance is exceptional.",

  'Mars-Saturn-square': "Action encounters resistance and frustration. While extremely challenging, this builds exceptional strength through persistent effort against obstacles. You earn every achievement through struggle.",

  'Mars-Uranus-conjunction': "Action is sudden, independent, and revolutionary. You act on impulse and refuse restriction. While your courage is impressive, grounding erratic energy serves practical goals. Your drive is electric.",

  'Mars-Neptune-conjunction': "Action is inspired and compassionate. You act on spiritual impulse. While your gentle strength is beautiful, clear boundaries and assertiveness may need development. Your drive serves transcendent purposes.",

  'Mars-Pluto-conjunction': "Tremendous willpower and transformative drive characterize your action. You cannot do anything halfway. While your power is impressive, conscious use of force matters. Your energy transforms what it touches.",

  'Mars-Pluto-square': "Action encounters crisis and power struggles. While intensely challenging, this creates exceptional resilience through extreme testing. Your will is refined through fire.",

  // OUTER PLANET ASPECTS
  'Jupiter-Saturn-conjunction': "Expansion meets structure in cycles of growth and consolidation. You balance optimism with realism. Wisdom comes through integrating faith and discipline.",

  'Jupiter-Saturn-square': "Growth meets limitation, creating tension between expansion and restriction. While challenging, this builds wisdom through balancing optimism with realism.",

  'Jupiter-Uranus-conjunction': "Sudden expansion and revolutionary growth characterize your development. Breakthroughs come unexpectedly. Progress requires embracing change and innovation.",

  'Jupiter-Neptune-conjunction': "Spiritual expansion and boundless faith characterize your growth. Dreams are expansive and idealistic. Grounding transcendent vision serves manifestation.",

  'Jupiter-Pluto-conjunction': "Transformative growth and powerful expansion define your development. Success is profound when it comes. Your capacity for regeneration and abundance is exceptional.",

  'Saturn-Uranus-square': "Structure clashes with revolution. Tradition meets innovation, creating tension between old and new. Your generation navigates balancing stability with necessary change.",

  'Saturn-Neptune-conjunction': "Structure meets dissolution. Discipline serves spiritual purposes. Your generation brings form to transcendent vision or dissolves rigid structures.",

  'Saturn-Pluto-conjunction': "Discipline meets transformation. Structure undergoes profound change. Your generation rebuilds foundations through crisis and regeneration.",

  'Uranus-Neptune-conjunction': "Innovation meets spirituality. Your generation dissolves boundaries through technological and spiritual awakening. Collective consciousness evolves.",

  'Uranus-Pluto-conjunction': "Revolution meets transformation. Your generation revolutionizes power structures through radical change. Collective evolution is profound.",

  'Neptune-Pluto-sextile': "Spiritual transformation occurs gradually in your generation. Dissolving outworn structures through transcendent vision guides collective evolution."
};

/**
 * Get interpretation for a specific aspect
 */
export function getAspectInterpretation(
  planet1: string,
  planet2: string,
  aspectType: AspectType
): string {
  const key = getAspectKey(planet1, planet2, aspectType);

  // Check for exact match
  if (ASPECT_INTERPRETATIONS[key]) {
    return ASPECT_INTERPRETATIONS[key];
  }

  // Generate generic interpretation if specific one not found
  return generateGenericAspectInterpretation(planet1, planet2, aspectType);
}

/**
 * Generate a generic interpretation for aspects not in the database
 */
function generateGenericAspectInterpretation(
  planet1: string,
  planet2: string,
  aspectType: AspectType
): string {
  const aspectQualities: Record<AspectType, string> = {
    conjunction: "merge and amplify each other's energies",
    opposition: "create polarity and awareness through tension",
    trine: "flow harmoniously together with ease",
    square: "generate dynamic tension requiring resolution",
    sextile: "offer opportunities through conscious effort",
    'semi-sextile': "create subtle friction requiring minor adjustment",
    quincunx: "require awkward adjustment between incompatible energies"
  };

  const quality = aspectQualities[aspectType] || "interact";

  return `${planet1} and ${planet2} ${quality}. This ${aspectType} aspect between these planets influences how their energies combine in your chart. The specific interpretation for this combination is being developed, but the ${aspectType} nature suggests ${aspectType === 'trine' || aspectType === 'sextile' ? 'harmonious flow' : aspectType === 'square' || aspectType === 'opposition' ? 'dynamic challenge' : 'unified expression'} between these planetary principles.`;
}
