import './style.scss'

import PopCreate, { PopOtions } from './popcreate'

const init = (options: PopOtions) => {
  const pop = new PopCreate(options)
  pop.init()
}

export default { init }
