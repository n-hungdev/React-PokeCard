import React, { useEffect, useRef } from 'react'

const PokeCard = ({ className = 'card charizard', children }) => {
  // document.querySelector => useRef
  // https://reactjs.org/docs/hooks-reference.html
  const cardRef = useRef()
  const styleRef = useRef()
  const timeoutRef = useRef()

  // https://reactjs.org/docs/hooks-effect.html
  useEffect(() => {
    if (cardRef.current && styleRef.current) {
      const fn = (e) => {
        // normalise touch/mouse
        let pos = [e.offsetX, e.offsetY]
        e.preventDefault()
        if (e.type === 'touchmove') {
          pos = [e.touches[0].clientX, e.touches[0].clientY]
        }
        // math for mouse position
        let l = pos[0]
        let t = pos[1]
        let h = cardRef.current.clientHeight
        let w = cardRef.current.clientWidth
        let px = Math.abs(Math.floor((100 / w) * l) - 100)
        let py = Math.abs(Math.floor((100 / h) * t) - 100)
        let pa = 50 - px + (50 - py)
        // math for gradient / background positions
        let lp = 50 + (px - 50) / 1.5
        let tp = 50 + (py - 50) / 1.5
        let px_spark = 50 + (px - 50) / 7
        let py_spark = 50 + (py - 50) / 7
        let p_opc = 20 + Math.abs(pa) * 1.5
        let ty = ((tp - 50) / 2) * -1
        let tx = ((lp - 50) / 1.5) * 0.5
        // css to apply for active card
        let grad_pos = `background-position: ${lp}% ${tp}%;`
        let sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`
        let opc = `opacity: ${p_opc / 100};`
        let tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`
        // need to use a <style> tag for psuedo elements
        let style = `
          .card:hover:before { ${grad_pos} }  /* gradient */
          .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
        `
        // set / apply css class and style
        cardRef.current.classList.remove('animated')
        cardRef.current.setAttribute('style', tf)
        styleRef.current.innerHTML = style

        if (e.type === 'touchmove') {
          return false
        }
        clearTimeout(timeoutRef.current)
      }

      const fnMouseOut = (e) => {
        styleRef.current.innerHTML = ''
        cardRef.current.setAttribute('style', '')
        timeoutRef.current = setTimeout(function () {
          cardRef.current.classList.add('animated')
        }, 2500)
      }

      cardRef.current.addEventListener('mousemove', fn)
      cardRef.current.addEventListener('mouseout', fnMouseOut)

      return () => {
        cardRef.current.removeEventListener('mousemove', fn)
        cardRef.current.removeEventListener('mouseout', fnMouseOut)
      }
    }
  }, [cardRef, styleRef])

  return (
    <>
      <div className={className} ref={cardRef}>
        {children}
      </div>
      <style className="hover" ref={styleRef} />
    </>
  )
}

export default PokeCard
