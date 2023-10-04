import './style.css'
import { snake } from './snake/index.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <canvas id="snake"></canvas
  </div>
`

snake(document.querySelector<HTMLCanvasElement>('#snake')!)
