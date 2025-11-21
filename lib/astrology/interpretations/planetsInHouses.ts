/**
 * Planet in House Interpretations
 * Comprehensive interpretations for all planetary placements in houses
 */

type PlanetHouseInterpretation = Record<string, Record<number, string>>;

export const PLANET_IN_HOUSE_INTERPRETATIONS: PlanetHouseInterpretation = {
  Sun: {
    1: "With the Sun in the 1st House, your identity and life purpose shine through your personality and physical presence. You're meant to be seen, to express yourself authentically, and to lead by example. Your vitality and sense of self are strong, and you naturally draw attention. Life is about discovering who you truly are and having the courage to be that person, regardless of others' expectations. Your appearance and first impressions matter to you, and you benefit from activities that build confidence and self-awareness.",

    2: "The Sun in the 2nd House focuses your life purpose on building security, developing your talents, and establishing self-worth. Material stability and financial success are important to your identity. You're meant to discover your inherent value and develop resources - both inner and outer. Your earning capacity and relationship with possessions reflect your self-esteem. Life lessons involve learning that you are valuable independent of what you own, while also honoring your need for tangible security.",

    3: "With the Sun in the 3rd House, your identity and purpose center on communication, learning, and connecting with your immediate environment. You're meant to share ideas, teach, write, or facilitate communication in some way. Intellectual pursuits and curiosity drive you. Relationships with siblings and neighbors may be significant. Your mind is a primary vehicle for self-expression, and you thrive when engaged in learning and sharing information.",

    4: "The Sun in the 4th House means your life purpose involves creating home, family, and emotional foundation. Your identity is deeply connected to your roots, ancestry, and private life. You may work from home or in real estate/family business. Inner security and emotional authenticity matter more than external success. You're meant to heal family patterns and create the safe base you need. Later life often brings increased prominence and fulfillment.",

    5: "With the Sun in the 5th House, creativity, self-expression, and joy are central to your life purpose. You're meant to shine through creative pursuits, romance, or children. Your identity needs outlets for artistic expression and play. Risk-taking and following your heart bring fulfillment. You teach others about authentic self-expression and the courage to create. Entertainment, performance, or working with children may feature in your path.",

    6: "The Sun in the 6th House focuses your purpose on service, health, and meaningful daily work. Your identity develops through being useful and improving yourself and your environment. Health and wellness practices are important to your vitality. You're meant to find sacred purpose in everyday tasks and help others through practical service. Work that serves a higher purpose fulfills you more than mere employment.",

    7: "With the Sun in the 7th House, relationships and partnership are central to your identity and life path. You discover yourself through others and may feel incomplete without a significant partner. You're meant to master the art of balanced relationship and cooperation. Business partnerships and counseling work may attract you. While relationships are important, learning to maintain your identity within them is crucial.",

    8: "The Sun in the 8th House means transformation, depth, and shared resources define your life purpose. You're drawn to psychology, healing, or work involving death/rebirth processes. Your identity involves facilitating transformation for yourself and others. Shared finances, inheritance, or managing others' resources may feature. You're meant to dive deep, heal wounds, and emerge renewed. Superficiality doesn't satisfy you.",

    9: "With the Sun in the 9th House, your identity centers on expansion, philosophy, and the search for meaning. Higher education, travel, or spiritual pursuits are vital to your development. You're meant to teach, publish, explore foreign cultures, or share wisdom. Your life purpose involves broadening perspectives - yours and others'. Freedom and growth matter more than security. You shine when inspiring others with vision and truth.",

    10: "The Sun in the 10th House places public life, career, and achievement at the center of your purpose. You're meant to be recognized and make a contribution to society. Professional success and reputation matter to your identity. Authority and responsibility come naturally. Your public role is important, and you're meant to rise to prominence in your field. Your life is somewhat public, and you influence through your career.",

    11: "With the Sun in the 11th House, your identity and purpose involve groups, friendships, and collective goals. You're meant to contribute to community, work toward progressive ideals, and connect people. Friendships may be more important than romantic relationships. Social causes, technology, or humanitarian work attract you. You shine when working for the greater good and honoring your unique vision.",

    12: "The Sun in the 12th House creates a more private, spiritual life purpose. You're meant to work behind the scenes, engage in spiritual practice, or serve without recognition. Your ego dissolves more easily than most, which is both a gift and a challenge. Solitude renews you, and you may work in hospitals, prisons, or retreat settings. Your identity involves transcending ego and connecting with something greater than yourself."
  },

  Moon: {
    1: "The Moon in the 1st House makes your emotions highly visible and influential in how you present yourself. Your mood fluctuates and shows in your face and demeanor. You need emotional authenticity and respond to life primarily through feelings. Nurturing yourself and others comes naturally. Your mother or maternal figures significantly influenced your identity. Emotional security requires being able to express your feelings freely and be received with empathy.",

    2: "With the Moon in the 2nd House, emotional security is tied to financial stability and material comfort. You need to feel resourced to feel safe. Your income may fluctuate, and you might work in food, caregiving, or domestic fields. Your values are emotionally driven, and you may seek comfort through purchases. Building tangible security soothes your emotions. Your relationship with money reflects your emotional state.",

    3: "The Moon in the 3rd House creates emotional connection through communication and learning. You process feelings by talking about them. Siblings and neighbors affect your emotional life significantly. Your mind and emotions are intertwined - thoughts influence feelings and vice versa. Short trips and variety soothe you. You may work in writing, teaching, or anything involving communication and emotional intelligence.",

    4: "With the Moon in the 4th House, in its natural house, home and family are profoundly important emotionally. You need a secure, nurturing home base to function well. Your mother or maternal line is especially significant. Emotional security comes through creating sanctuary and caring for family. You may work from home or in real estate. Your roots and past profoundly influence your emotional life. Private life matters more than public.",

    5: "The Moon in the 5th House finds emotional fulfillment through creativity, romance, and children. Your moods influence your creative expression. Children (your own or others') may be emotionally important. Romance and play renew you emotionally. Your emotions need creative outlets, and you're playful and spontaneous when comfortable. Your heart and emotions work together - you love with your whole being.",

    6: "With the Moon in the 6th House, emotional security comes through daily routines, meaningful work, and health practices. Service and being useful soothes your emotions. You may be emotionally affected by work environment and coworkers. Health issues may be psychosomatic - your body reflects your emotions. Caring for others and maintaining healthy routines provide emotional stability.",

    7: "The Moon in the 7th House creates emotional need for partnership and relationship. You feel incomplete without a significant other. Emotional security depends on having harmonious relationships. You're highly attuned to partners' emotions and may lose touch with your own. You need a nurturing partner who provides emotional security. Your mother may have modeled strong partnerships or you seek maternal qualities in partners.",

    8: "With the Moon in the 8th House, your emotional nature is intense, deep, and transformative. You need profound emotional intimacy to feel secure. Superficial interactions don't satisfy you. You're emotionally private and guard your vulnerabilities carefully. Crisis and transformation are familiar emotional territory. You may have emotional or psychic connections with those who've passed. Shared resources affect your emotional state.",

    9: "The Moon in the 9th House finds emotional fulfillment through exploration, learning, and expansion. Travel soothes your soul and adventure renews you emotionally. You need freedom and space to roam. Philosophy and spiritual pursuits provide emotional security. You may have lived abroad or your mother exposed you to different cultures. Your emotions need room to breathe and grow.",

    10: "With the Moon in the 10th House, your private emotions are somewhat public. Your career may involve nurturing/caregiving or working with women and families. Public reputation affects your emotional state. You may have a public relationship with your mother or motherhood influences your career. Emotional security comes through professional achievement and public recognition. You're known for your emotional intelligence.",

    11: "The Moon in the 11th House creates emotional fulfillment through friendships, groups, and working toward ideals. Friends are like family to you. Community involvement and progressive causes provide emotional security. You need freedom within emotional connections. Your mother may have been unconventional or progressive. You're emotionally attached to your vision for the future and need to contribute to collective well-being.",

    12: "With the Moon in the 12th House, your emotional life is private, complex, and deeply spiritual. You need solitude to process feelings. Your emotions connect you to collective unconscious and universal suffering. Boundaries are porous - you absorb others' emotions. Past life emotional patterns may influence you. Service, spirituality, and creative solitude soothe you. Time alone in nature or meditation is essential."
  },

  Mercury: {
    1: "Mercury in the 1st House makes communication and mental activity central to your identity. You're perceived as intelligent, talkative, and curious. Your mind is active and visible - people know what you're thinking. You think about yourself and your interests. Mental stimulation is essential to your well-being. You may work as a communicator, teacher, or in any field requiring mental agility.",

    2: "With Mercury in the 2nd House, you think about money, resources, and values. Your earning capacity may involve communication, writing, or teaching. You're mentally practical and think about tangible results. Your mind develops ideas slowly but thoroughly. Financial decisions are well-reasoned. You may make money through speaking, selling, or using your intellectual skills.",

    3: "Mercury in the 3rd House is in its natural domain, creating exceptional communication abilities. You're naturally curious, articulate, and mentally restless. Learning comes easily and you love variety. Siblings and neighbors are mentally stimulating. You may work in writing, teaching, sales, or media. Your mind needs constant input and you think quickly and clearly.",

    4: "With Mercury in the 4th House, your thinking is influenced by family background and emotional security. You may work from home or in real estate/family business. Your mind turns toward past, home, and emotional foundations. You think about creating security and may study psychology or family systems. Your home is filled with books and you communicate best in familiar environments.",

    5: "Mercury in the 5th House brings mental creativity and playful communication. You think about creative projects, children, and romance. Your mind is dramatic and expressive. Creative writing, teaching children, or performing may attract you. You communicate with flair and enjoy mental games. Your mental activity is connected to your heart - you think about what you love.",

    6: "With Mercury in the 6th House, your mind focuses on work, health, and service. You think analytically and notice details others miss. Organization and efficiency matter to you. You may work in health care, editing, or any field requiring precision. Your mental health affects your physical health. You communicate about practical matters and solve problems efficiently.",

    7: "Mercury in the 7th House means relationships stimulate your mind. You think through partnerships and may have a mentally stimulating partner. Counseling, mediation, or relationship work may attract you. You see multiple perspectives easily. Your mind is balanced and diplomatic. Communication within relationships is essential to your happiness. You think about fairness and cooperation.",

    8: "With Mercury in the 8th House, your mind delves into mysteries, psychology, and transformation. You think deeply and probe beneath surfaces. Research, investigation, or healing work attracts you. You're private about your thoughts and communicate about profound matters. Shared resources and intimate connections occupy your mind. Your thinking transforms over time.",

    9: "Mercury in the 9th House creates philosophical, expansive thinking. Higher education, publishing, and teaching attract you. You think big-picture and communicate about meaning and truth. Travel stimulates your mind. You may study or teach philosophy, religion, or law. Your mind needs freedom and space to explore. You communicate about vision and possibility.",

    10: "With Mercury in the 10th House, communication is central to your career. You're known for your mental abilities and may work as a spokesperson, teacher, or writer. Professional reputation is tied to how you think and communicate. You think about your career and public role. Public speaking or writing may feature in your work. Your ideas reach a broad audience.",

    11: "Mercury in the 11th House focuses your mind on groups, friendships, and collective goals. You think about the future and social progress. Friends stimulate your mind. Technology, networking, or community work attracts you. You communicate about ideals and innovation. Group brainstorming energizes you. Your thinking is progressive and humanitarian.",

    12: "With Mercury in the 12th House, your mind works intuitively and imaginatively. You think in symbols and metaphors. Private, reflective thinking suits you better than public communication. You may work in research, spirituality, or healing. Your thoughts connect to unconscious and spiritual dimensions. Meditation and creative solitude clarify your thinking. Dreams and intuition inform your mental process."
  },

  Venus: {
    1: "Venus in the 1st House brings charm, grace, and attractiveness to your personality. You're naturally diplomatic and people are drawn to you. Relationships and beauty are important to your identity. You attract opportunities and people easily. Personal appearance matters, and you present yourself aesthetically. Partnership is central to your life path. You approach life seeking harmony and beauty.",

    2: "With Venus in the 2nd House, you value beauty, pleasure, and financial security. You attract resources and may earn through the arts, beauty industry, or luxury goods. You appreciate quality and surround yourself with beautiful things. Your self-worth is connected to your resources. Love and money are linked in your psychology. You're generous with both affection and possessions.",

    3: "Venus in the 3rd House brings charm to communication and harmonious connections with siblings and neighbors. You communicate beautifully and may write about relationships or aesthetics. Mental connection is important in relationships. You're diplomatic in speech and think about relationships. Short trips bring pleasure. You may work in writing, teaching, or sales, using your charm to connect.",

    4: "With Venus in the 4th House, you create beauty in your home and value family harmony. Your home is aesthetically pleasing and comfortable. You love domesticity and may work in interior design or real estate. Family relationships are important to your happiness. You're devoted to loved ones. Emotional security and beautiful surroundings are essential to your well-being.",

    5: "Venus in the 5th House creates joy through creativity, romance, and children. Love affairs and artistic expression bring fulfillment. You're romantic, playful, and creative. Children may feature importantly in your life. Performance arts or working with children attracts you. You love to celebrate and need outlets for creative self-expression. Romance and beauty intertwine.",

    6: "With Venus in the 6th House, you find pleasure in service, health practices, and daily work. You need to love your work to be happy. Harmonious work environments matter. You may work in healthcare, the arts, or service industries. Relationships with coworkers are important. Beautiful, healthy routines bring fulfillment. You serve others gracefully and skillfully.",

    7: "Venus in the 7th House is in its natural home, making partnership central to your life. You're most yourself in relationship. Marriage and business partnerships are important. You attract charming, beautiful partners. Diplomacy and mediation may feature in your work. Relationship harmony is essential to your happiness. You approach all interactions with grace and fairness.",

    8: "With Venus in the 8th House, you love deeply, intensely, and transformatively. Superficial connections don't satisfy you. You're attracted to mystery, depth, and emotional intimacy. Shared resources and intimate partnerships are important. You may benefit financially through partnerships or inheritance. Your values transform through intimate relationships. You find beauty in depth and transformation.",

    9: "Venus in the 9th House brings love of travel, philosophy, and cultural exploration. You're attracted to foreign people and places. Higher education and teaching may bring fulfillment. You value freedom, expansion, and meaning. Relationships with people from different backgrounds attract you. You find beauty in diversity and adventure. Your values are philosophical and expansive.",

    10: "With Venus in the 10th House, career and public life bring fulfillment. You may work in arts, beauty, or relationship-focused fields. Your public reputation is important, and you're known for charm and diplomacy. Professional relationships matter. You attract career opportunities. Success comes through partnerships and using your social grace. Public life is harmonious.",

    11: "Venus in the 11th House creates fulfillment through friendships, groups, and working toward ideals. Friends may become lovers and lovers should be friends. Community and social causes matter. You value friendship and equality in relationships. Group activities and networking bring pleasure. You're attracted to progressive, unique people. Collective endeavors fulfill you.",

    12: "With Venus in the 12th House, love is spiritual, compassionate, and sometimes secretive. You love selflessly and may sacrifice for love. Privacy in relationships appeals to you. Spiritual connections and artistic solitude bring fulfillment. You may have secret relationships or love someone from afar. Service and compassion express your loving nature. Beauty and spirituality intertwine."
  },

  Mars: {
    1: "Mars in the 1st House gives you dynamic energy, assertiveness, and a competitive nature. You take action directly and courageously. Physical activity is essential and you have strong vitality. Independence matters deeply. You may be accident-prone or have scars. Leadership comes naturally but patience may need development. You approach life as a challenge to conquer.",

    2: "With Mars in the 2nd House, you take action to build security and resources. Your earning capacity is strong but income may fluctuate with your drive. You work hard for material stability. Values are fought for and defended. You may spend impulsively when angry. Physical work and tangible results satisfy you. Your energy goes toward creating abundance.",

    3: "Mars in the 3rd House creates quick thinking and direct communication. You speak your mind, sometimes bluntly. Mental energy is high and you debate with enthusiasm. Siblings may be competitive or athletic. You take action through communication and ideas. Writing with passion or teaching with intensity suits you. Short trips are adventurous. Your mind is a weapon and a tool.",

    4: "With Mars in the 4th House, energy goes toward home, family, and emotional security. You may work from home or in real estate. Family relationships may be competitive or conflictual, teaching you about healthy assertion. Home improvement projects appeal to you. Your private life is energetic. Emotional security requires physical activity. You defend your foundation fiercely.",

    5: "Mars in the 5th House brings passionate energy to creativity, romance, and children. You create with vigor and love intensely. Competitive sports or dramatic performance attracts you. Risk-taking excites you. Children may be athletic or spirited. You pursue pleasure actively. Your creative drive is strong and sexual energy high. Life should be exciting.",

    6: "With Mars in the 6th House, you work hard and energetically. Meaningful work is essential to channel your drive. Health issues may arise from overwork or suppressed anger. You serve others actively and may work in healthcare, military, or physical fields. Fitness routines are important. You take action through efficient service and solving practical problems.",

    7: "Mars in the 7th House creates passionate partnerships but also potential conflict. You're attracted to assertive, independent partners. Relationships activate your drive and may bring out competitiveness. Business partnerships are energetic. You learn about assertion through relationship. Partners may be athletic or aggressive. You take action through partnership.",

    8: "With Mars in the 8th House, your drive is intense, focused, and transformative. Sexual energy is powerful. You take action in crisis and handle emergencies well. Shared resources may create conflict. You're drawn to depth psychology, healing, or working with death/rebirth. Your passion is profound and you transform through action.",

    9: "Mars in the 9th House creates passionate pursuit of meaning, education, and adventure. You take action toward expansion and growth. Travel is energetic and adventure calls you. Your beliefs are fought for and defended. Sports, outdoor activities, or physical exploration attract you. You teach with passion and learn through experience. Freedom requires assertion.",

    10: "With Mars in the 10th House, career drive is strong and public. You work toward success energetically and want to be known for your achievements. Leadership and authority roles suit you. Professional competition motivates you. You may work in military, athletics, or entrepreneurship. Ambition drives you toward the top.",

    11: "Mars in the 11th House directs energy toward groups, friends, and collective goals. You take action for causes you believe in. Group activities are energetic and competitive friendships challenge you. Social activism or community leadership appeals to you. You fight for progressive ideals. Friends should share your active lifestyle.",

    12: "With Mars in the 12th House, your drive is private, spiritual, or sometimes self-sabotaging. You work behind the scenes or in retreat settings. Action serves transcendent purposes. Hidden enemies or internal conflicts may surface. Spiritual practices involving movement (yoga, martial arts) suit you. Compassionate action and surrendering ego-driven ambition bring fulfillment."
  },

  Jupiter: {
    1: "Jupiter in the 1st House expands your personality, optimism, and physical presence. You're naturally fortunate and approach life with faith and enthusiasm. People see you as generous and wise. Teaching, inspiring, or working in education may feature. Your worldview is expansive and you attract opportunities. Overdoing things may be your only excess.",

    2: "With Jupiter in the 2nd House, resources and values expand. You attract abundance and may accumulate wealth. Generosity with possessions comes naturally. Earning capacity is strong, especially in teaching, sales, or entrepreneurship. Your values are expansive and you believe in abundance. Overindulgence is possible. Prosperity grows through optimism and wise investments.",

    3: "Jupiter in the 3rd House expands communication, learning, and connections. Your mind is philosophical and curious. Teaching, writing, or public speaking brings success. Siblings may be fortunate or numerous. Short trips bring opportunity. You communicate with enthusiasm and optimism. Higher education may be important. Your mind seeks wisdom and meaning.",

    4: "With Jupiter in the 4th House, home and family expand and bring blessings. You may have a large or comfortable home. Family relationships are supportive and fortunate. Real estate investments prosper. Emotional security is strong. Later life brings increased fortune. Your roots provide wisdom and opportunities. Home is sanctuary and classroom.",

    5: "Jupiter in the 5th House expands creativity, joy, and self-expression. Children bring blessings (you may have many). Creative pursuits succeed and romance is generous. Risk-taking is fortunate. Teaching children or creative work fulfills you. You're playful, optimistic, and generous with your heart. Life should be enjoyed fully.",

    6: "With Jupiter in the 6th House, service and health expand. Meaningful work brings fulfillment and you serve generously. Healthcare, teaching, or service industries attract you. Health is generally good though moderation matters. You grow through daily practices and helping others. Work should have meaning beyond mere employment.",

    7: "Jupiter in the 7th House brings expansion through partnership. Marriage and business partnerships are fortunate. You're generous in relationship and attract optimistic partners. Legal work, counseling, or teaching through partnership succeeds. Relationships expand your worldview. You learn wisdom through others.",

    8: "With Jupiter in the 8th House, transformation and shared resources expand. Psychology, healing, or metaphysical work attracts you. Inheritance or partner's resources may benefit you. Sexual expression is generous. Crisis brings growth. You transform optimistically and help others through transitions. Depth work brings wisdom.",

    9: "Jupiter in the 9th House is in its natural home, creating strong fortune through higher education, travel, and philosophy. Teaching, publishing, or spiritual work succeeds naturally. Long journeys bring opportunity. Your faith is strong and worldview expansive. You're a natural philosopher and may study religion or law. Sharing wisdom fulfills you.",

    10: "With Jupiter in the 10th House, career brings expansion and recognition. Professional success is likely, especially in teaching, law, or leadership. Your reputation is excellent and you're known for wisdom. Authority comes naturally. Public service or working for meaningful causes succeeds. Your career should serve higher purposes.",

    11: "Jupiter in the 11th House expands through friendships, groups, and working toward ideals. Friends bring opportunities and your social circle is large. Humanitarian work succeeds. Community leadership appeals to you. Your vision for the future is optimistic. Collective endeavors bring growth. Hope and progressive ideals guide you.",

    12: "With Jupiter in the 12th House, spirituality and service expand. You're privately generous and may work in retreat, healing, or spiritual settings. Faith sustains you through difficulties. Meditation and spiritual practice bring wisdom. Hidden blessings protect you. Serving without recognition fulfills you. Transcendent experiences guide your path."
  },

  Saturn: {
    1: "Saturn in the 1st House creates early challenges with confidence and self-expression. Responsibility weighs on you and life feels serious. You mature early and build self-assurance through time. Your presence becomes authoritative with age. Discipline and hard work define your approach. Later life brings respect and mastery. Patience with yourself builds character.",

    2: "With Saturn in the 2nd House, building security requires patience and disciplined effort. Early financial challenges teach resourcefulness. Your values are conservative and practical. Earning capacity grows with maturity. You learn to value quality over quantity. Security comes through sustained effort and wise management. Self-worth develops through overcoming scarcity mindset.",

    3: "Saturn in the 3rd House can create early learning challenges or communication fears. Your mind is serious and methodical. Speaking up requires courage. Siblings may be older or responsible. You think carefully before speaking. Teaching or writing develops through discipline. Mastery of communication comes through patient practice.",

    4: "With Saturn in the 4th House, family responsibility arrives early. Home life may be serious or restrictive. Building secure foundation takes time. Parental figures may be strict or absent. Emotional security requires work. Later life brings stability and comfortable home. You create the family structure you need.",

    5: "Saturn in the 5th House can limit spontaneous joy and creative expression initially. Romance may be serious or delayed. You're cautious with your heart. Creative work requires discipline. Children bring responsibility. You learn to play and create through overcoming fear. Mature romance and disciplined creativity bring lasting fulfillment.",

    6: "With Saturn in the 6th House, work is serious and health requires attention. You're a disciplined worker who takes responsibility seriously. Health issues teach self-care. Service is dutiful and you work efficiently. Employment may be structured or restrictive. Mastery comes through sustained daily practice. Meaningful work sustains you.",

    7: "Saturn in the 7th House creates serious approach to partnership. Marriage may be delayed or to someone older. Relationships bring important lessons. Commitment is deep once given. Business partnerships are disciplined. You learn relationship mastery through patience. Mature, lasting partnerships eventually form.",

    8: "With Saturn in the 8th House, transformation and intimacy require patience. Shared resources may be limited or structured. Sexual expression may be inhibited initially. Crisis teaches resilience. Psychology and depth work develop through discipline. Trust and vulnerability come slowly. Transformation is thorough when it happens.",

    9: "Saturn in the 9th House creates structured approach to philosophy and education. Higher education may be delayed but deeply valued. Your beliefs are traditional or carefully constructed. Long journeys require planning. Teaching comes later in life with authority. Wisdom develops through sustained study and life experience.",

    10: "With Saturn in the 10th House, in its natural home, career is serious business. Ambition is strong and you work patiently toward success. Authority and recognition come through sustained effort. Professional responsibility weighs heavily but builds character. Public roles require discipline. Success is earned, lasting, and respected.",

    11: "Saturn in the 11th House creates serious friendships and structured group involvement. Friends may be older or responsible. Social goals require patient work. Community leadership develops through time. Ideals are practical and tested. You build lasting networks through reliability. Collective work requires discipline.",

    12: "With Saturn in the 12th House, spiritual growth and service require patient inner work. Solitude may be necessary or enforced. Hidden fears need facing. Karma and past patterns need resolving. Spiritual practice benefits from structure. Service and compassion develop through overcoming isolation. Inner authority builds through retreat."
  },

  Uranus: {
    1: "Uranus in the 1st House makes you uniquely individual and independent. You present yourself unconventionally and value freedom above all. Sudden changes in appearance or direction are natural. You're progressive, innovative, and sometimes rebellious. While your originality is refreshing, grounding your brilliance serves practical goals.",

    2: "With Uranus in the 2nd House, your relationship with money and resources is unconventional. Income may fluctuate or come from unusual sources. You value freedom and innovation over security. Technology or progressive fields may provide income. While experimentation is natural, some financial grounding stabilizes your life.",

    3: "Uranus in the 3rd House creates brilliant, innovative thinking. You communicate original ideas and learn through experimentation. Technology or progressive education attracts you. Siblings may be unusual. Your mind works intuitively and makes unexpected connections. Conventional learning may not suit you - you need mental freedom.",

    4: "With Uranus in the 4th House, home life is unconventional or unstable. You may move frequently or create unusual living situations. Family background may be progressive or disruptive. You need freedom even in home life. Later life brings unexpected changes. You create the family and foundation you need.",

    5: "Uranus in the 5th House brings unique creativity and unconventional romance. Children may be unusual or relationships with them non-traditional. Creative expression is innovative and experimental. Romance is exciting but may be unstable. You need freedom in love. Your creative work breaks new ground.",

    6: "With Uranus in the 6th House, work patterns are unconventional. You need freedom in employment and may work in technology or progressive fields. Health issues may be unusual or benefit from alternative approaches. Service is innovative. Routine work frustrates you - you need variety and autonomy.",

    7: "Uranus in the 7th House creates unusual partnerships or unstable relationships. You're attracted to unique, independent partners. Conventional marriage may not suit you. Business partnerships are innovative but may be unstable. You need freedom within relationship. Partners awaken your individuality.",

    8: "With Uranus in the 8th House, transformation is sudden and electric. Shared resources may be unstable. Sexual expression is unconventional. Crisis brings awakening. Psychology and metaphysical subjects attract you. Inheritance may be unexpected. Deep change happens in lightning flashes.",

    9: "Uranus in the 9th House creates progressive philosophy and unconventional beliefs. Higher education may be non-traditional. Travel is sudden and enlightening. Your worldview is innovative and humanitarian. Teaching progressive subjects attracts you. Spiritual awakening comes through expanding consciousness.",

    10: "With Uranus in the 10th House, career involves innovation, technology, or progressive causes. Professional path may be unstable or unconventional. You're known for originality and may experience sudden fame. Authority structures frustrate you. Your public contribution should revolutionize your field.",

    11: "Uranus in the 11th House is in its natural domain, creating strong humanitarian ideals and innovative group work. Friends are unusual and stimulating. Social causes involve progressive change. Community work uses technology or revolutionary approaches. Your vision for the future is radical and inspiring.",

    12: "With Uranus in the 12th House, spiritual awakening comes suddenly and intuitively. Hidden work or research attracts you. Unconscious contains brilliant insights. Service is innovative. Freedom from ego is goal. Meditation and metaphysical work awaken consciousness. Liberation is spiritual."
  },

  Neptune: {
    1: "Neptune in the 1st House makes you highly sensitive, compassionate, and somewhat elusive. Others may project onto you or see what they want to see. Boundaries are challenging and you absorb others' energy. While your empathy is beautiful, maintaining your identity requires conscious effort. Creativity and spirituality enhance your presence.",

    2: "With Neptune in the 2nd House, material reality is somewhat fluid. Money may slip through your fingers or come from creative/spiritual sources. Values are idealistic. You may give to anyone in need. While generosity is admirable, practical financial grounding serves you. Earning through creativity or healing suits you.",

    3: "Neptune in the 3rd House creates imaginative, intuitive thinking. Your mind works through inspiration rather than logic. Communication is poetic or confusing. Learning benefits from creative approaches. Siblings may be artistic or elusive. Writing, music, or mystical subjects attract you. Your thoughts connect to collective consciousness.",

    4: "With Neptune in the 4th House, home and family are idealized or unclear. Family boundaries may be porous. You may sacrifice for family. Your home should be sanctuary and meditation space. Roots may be unclear or imaginative. Emotional security comes through spiritual connection. Creating ideal home fulfills you.",

    5: "Neptune in the 5th House brings creative imagination and romantic idealism. Love is transcendent but relationships may disappoint when reality intrudes. Children may be sensitive or artistic. Creative expression is inspired and spiritual. While romance is beautiful, clarity about partners matters. Art and spirituality through creation fulfill you.",

    6: "With Neptune in the 6th House, service is compassionate and work may involve healing, arts, or spirituality. Practical work frustrates unless it serves transcendent purpose. Health may be sensitive to energy and environment. Boundaries at work need attention. Service to suffering or creative work suits you best.",

    7: "Neptune in the 7th House creates idealistic, spiritual approach to partnership. You may idealize partners or attract those needing saving. Boundaries in relationship are challenging. While your capacity for unconditional love is beautiful, seeing partners clearly prevents disappointment. Spiritual partnership or creative collaboration fulfills you.",

    8: "With Neptune in the 8th House, intimacy and transformation are spiritual experiences. Boundaries dissolve in deep connection. Sexual expression is transcendent. Shared resources may be unclear. Psychology and mysticism attract you. Crisis brings spiritual awakening. You heal others through compassionate presence.",

    9: "Neptune in the 9th House creates mystical approach to philosophy and spirituality. Higher truth is accessed through faith and intuition. Travel is spiritual pilgrimage. Teaching involves inspiration and creative expression. Beliefs are compassionate and universal. While idealism is beautiful, discrimination prevents delusion.",

    10: "With Neptune in the 10th House, career involves creativity, spirituality, or service. Professional boundaries may be unclear. You may be known for artistic or healing work. Public image can be idealized or confusing. While inspired work is fulfilling, clarity about professional goals grounds your vision.",

    11: "Neptune in the 11th House creates idealistic vision for humanity. Friends may be artistic or spiritual. Groups dissolve ego boundaries. Social causes involve compassion and healing. While humanitarian ideals inspire, practical action manifests dreams. Community through spiritual or creative work fulfills you.",

    12: "With Neptune in the 12th House, in its natural home, spirituality and transcendence are profound. Meditation and solitude are essential. Service to suffering fulfills you. Boundaries with collective unconscious are porous. Creative and healing work behind scenes suits you. Spiritual life is your true home."
  },

  Pluto: {
    1: "Pluto in the 1st House gives you intense presence and transformative energy. Others sense your power even if you're quiet. You've likely experienced death/rebirth of identity. Control and power themes are personal. While your intensity is impressive, allowing vulnerability deepens connection. Your life purpose involves profound personal transformation.",

    2: "With Pluto in the 2nd House, resources and values undergo deep transformation. Power issues may arise around money. You're resourceful and can create abundance from nothing. What you value transforms radically over time. While financial power matters, true security comes from within. Your relationship with material world evolves profoundly.",

    3: "Pluto in the 3rd House creates penetrating mind and powerful communication. You see through surface to hidden truth. Research and investigation attract you. Communication transforms others. Siblings may experience crisis or power dynamics. Your words have impact and you speak profound truths. Mental transformation is ongoing.",

    4: "With Pluto in the 4th House, family and roots involve power, secrets, or transformation. Home life may have been intense. Emotional security requires healing deep wounds. You may completely transform your family patterns. While past is powerful, you're not victim to it. Creating new foundation is your journey.",

    5: "Pluto in the 5th House brings intensity to creativity, romance, and children. Love is all-consuming and transformative. Creative expression channels deep emotions. Children (yours or others') may be powerful teachers. While passion is beautiful, obsession needs awareness. Creation and love transform you profoundly.",

    6: "With Pluto in the 6th House, work and health are sites of transformation. You work with intensity and may facilitate others' healing. Health crisis may prompt profound change. Service is deep and transformative. While dedication is admirable, balance prevents burnout. Your daily life evolves completely over time.",

    7: "Pluto in the 7th House creates transformative partnerships. Relationships are intense, deep, and evolutionary. Power dynamics need conscious navigation. Partners may be powerful or controlling. While intimacy is profound, maintaining autonomy is crucial. Relationship transforms you fundamentally.",

    8: "With Pluto in the 8th House, in its natural home, transformation, death/rebirth, and shared resources are central themes. Crisis is familiar territory. Sexual energy is powerful. Psychology and healing are natural gifts. While depth is your strength, allowing lightness balances intensity. Profound transformation is your path.",

    9: "Pluto in the 9th House transforms beliefs and worldview completely. Philosophy is intense and you seek ultimate truth. Travel or education may be transformative. Teaching others powerful truths attracts you. While conviction is strong, evolution of beliefs continues. Your understanding of meaning transforms radically.",

    10: "With Pluto in the 10th House, career involves power, transformation, or deep change. Professional life may be intense or involve crisis. You're known for your power and may rise to significant authority. While ambition is natural, using power wisely matters. Your public role transforms society.",

    11: "Pluto in the 11th House brings transformative approach to groups and ideals. Friendships are intense and evolutionary. Social causes involve profound change. Groups may experience power dynamics. While collective transformation matters, maintaining individuality is important. Your vision revolutionizes social structures.",

    12: "With Pluto in the 12th House, unconscious and spiritual transformation are profound. Hidden work or depth psychology attracts you. Solitude facilitates regeneration. Past life patterns may need healing. While inner work is essential, bringing insights into consciousness serves growth. Spiritual death/rebirth defines your path."
  }
};

/**
 * Get interpretation for a planet in a specific house
 */
export function getPlanetInHouseInterpretation(planet: string, house: number): string {
  return PLANET_IN_HOUSE_INTERPRETATIONS[planet]?.[house] ||
    `Interpretation for ${planet} in House ${house} is being developed.`;
}
