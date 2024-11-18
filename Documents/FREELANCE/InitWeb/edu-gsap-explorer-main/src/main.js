import './styles/style.css'
import gsap from 'gsap'
import SplitType from 'split-type'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)


console.log(
    '%c Dev by Thomas Carré\n' + 
    '🌐 Website: https://carre.studio.com\n' +
    '🐦 Twitter/X: https://x.com/ThomasCarre_/\n' +
    '📸 Instagram: https://www.instagram.com/carre__studio/\n' +
    '💼 LinkedIn: https://www.linkedin.com/in/thomas-carre/' ,
    'background-color: #0b0b0b; color: #8B9A46; font-size:10px; padding:6px 10px 6px; border-radius:4px; line-height: 1.5;'
)

const randomText = new SplitType('.random', { types: 'chars' })
const lineText = new SplitType('.line', { types: 'chars' })

gsap.set('.random .char', {
  opacity: 0,
  rotationY: 180
})
gsap.set('.line .char', {
  opacity: 0
})

gsap.fromTo('.home-hero_background_image', 
  {
    width: '80%',
    height: '80%'
  },
  {
    width: '100%',
    height: '100%',
    duration: 1.5,
    ease: 'power3.inOut',
    onComplete: () => {
      gsap.to('.random .char', {
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.02
      })

      gsap.to('.line .char', {
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.02
      })
    }
  }
)

// Animation pour le texte .writing dans la section mind
const mindLineText = new SplitType('.section--home-mind .writing', { types: 'chars' })

// État initial
gsap.set('.section--home-mind .writing .char', {
  opacity: 0,
})

// Animation au scroll
ScrollTrigger.create({
  trigger: '.section--home-mind',
  start: 'top 60%',
  onEnter: () => {
    gsap.to('.section--home-mind .writing .char', {
      opacity: 1,
      duration: 1,
      stagger: 0.01,
      ease: 'power2.out'
    })
  }
})

// Configuration du scroll horizontal
const horizontalScroll = gsap.timeline({
  scrollTrigger: {
    trigger: '.section--home-hscroll',
    pin: true,
    start: 'top top',
    end: () => `+=${document.querySelector('.home-hscroll_container').scrollWidth - window.innerWidth}`,
    scrub: 1,
    anticipatePin: 1,
    pinSpacing: true
  }
})

// Animation du conteneur horizontal
horizontalScroll.to('.home-hscroll_container', {
  x: () => -(document.querySelector('.home-hscroll_container').scrollWidth - window.innerWidth),
  ease: 'power1.inOut'
})

// Animation optionnelle pour les projets
ScrollTrigger.batch('.home-work_project', {
  onEnter: batch => {
    gsap.from(batch, {
      duration: 1,
      ease: 'power2.out'
    })
  },
  start: 'top 80%'
})


