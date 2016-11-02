import React, { PropTypes } from 'react'

const FontTest = (props) => {
  return (
    <div className="t7-font-test">
      <div className="t7-font__header">Usage</div>
      <code>font-family: {props.usage};</code>
      <br />
      <br />

      <div className="t7-font__header">Weights</div>
      <div style={{fontWeight: 300, fontFamily: props.usage}}>Light <small>300</small></div>
      <div style={{fontWeight: 500, fontFamily: props.usage}}>Regular <small>500</small></div>
      <div style={{fontWeight: 700, fontFamily: props.usage}}>Semi-Bold <small>700</small></div>
      <div style={{fontWeight: 900, fontFamily: props.usage}}>Bold <small>900</small></div>
      <br />

      <div className="t7-font__header">Sample</div>
      <h2 style={{fontFamily: props.usage}}>The spectacle before us was indeed sublime.</h2>
      <p style={{fontFamily: props.usage}}>
        Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds.
      </p>
      <br />

      <div className="t7-font__header">Characters</div>
      <p className="t7-font-test__characters" style={{fontFamily: props.usage}}>
        {`A​‌B​‌C​‌Ć​‌Č​‌D​‌Đ​‌E​‌F​‌G​‌H​‌I​‌J​‌K​‌L​‌M​‌N​‌O​‌P​‌Q​‌R​‌S​‌Š​‌T​‌U​‌V​‌W​‌X​‌Y​‌Z​‌Ž​‌a​‌b​‌c​‌č​‌ć​‌d​‌đ​‌e​‌f​‌g​‌h​‌i​‌j​‌k​‌l​‌m​‌n​‌o​‌p​‌q​‌r​‌s​‌š​‌t​‌u​‌v​‌w​‌x​‌y​‌z​‌ž​‌А​‌Б​‌В​‌Г​‌Ґ​‌Д​‌Ђ​‌Е​‌Ё​‌Є​‌Ж​‌З​‌Ѕ​‌И​‌І​‌Ї​‌Й​‌Ј​‌К​‌Л​‌Љ​‌М​‌Н​‌Њ​‌О​‌П​‌Р​‌С​‌Т​‌Ћ​‌У​‌Ў​‌Ф​‌Х​‌Ц​‌Ч​‌Џ​‌Ш​‌Щ​‌Ъ​‌Ы​‌Ь​‌Э​‌Ю​‌Я​‌а​‌б​‌в​‌г​‌ґ​‌д​‌ђ​‌е​‌ё​‌є​‌ж​‌з​‌ѕ​‌и​‌і​‌ї​‌й​‌ј​‌к​‌л​‌љ​‌м​‌н​‌њ​‌о​‌п​‌р​‌с​‌т​‌ћ​‌у​‌ў​‌ф​‌х​‌ц​‌ч​‌џ​‌ш​‌щ​‌ъ​‌ы​‌ь​‌э​‌ю​‌я​‌Α​‌Β​‌Γ​‌Δ​‌Ε​‌Ζ​‌Η​‌Θ​‌Ι​‌Κ​‌Λ​‌Μ​‌Ν​‌Ξ​‌Ο​‌Π​‌Ρ​‌Σ​‌Τ​‌Υ​‌Φ​‌Χ​‌Ψ​‌Ω​‌α​‌β​‌γ​‌δ​‌ε​‌ζ​‌η​‌θ​‌ι​‌κ​‌λ​‌μ​‌ν​‌ξ​‌ο​‌π​‌ρ​‌σ​‌τ​‌υ​‌φ​‌χ​‌ψ​‌ω​‌ά​‌Ά​‌έ​‌Έ​‌έ​‌Ή​‌ί​‌ϊ​‌ΐ​‌Ί​‌ό​‌Ό​‌ύ​‌ΰ​‌ϋ​‌Ύ​‌Ϋ​‌Ώ​‌Ă​‌Â​‌Ê​‌Ô​‌Ơ​‌Ư​‌ă​‌â​‌ê​‌ô​‌ơ​‌ư​‌1​‌2​‌3​‌4​‌5​‌6​‌7​‌8​‌9​‌0​‌‘​‌?​‌’​‌“​‌!​‌”​‌(​‌%​‌)​‌[​‌#​‌]​‌{​‌@​‌}​‌/​‌&amp;​‌&lt;​‌-​‌+​‌÷​‌×​‌=​‌&gt;​‌®​‌©​‌$​‌€​‌£​‌¥​‌¢​‌:​‌;​‌,​‌.​‌*`}
      </p>
      <br />
    </div>
  )
}

FontTest.propTypes = {
  family: PropTypes.string
}

export default FontTest
