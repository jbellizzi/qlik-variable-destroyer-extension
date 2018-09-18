import { connectSession } from 'rxq'
import { EngineVersion, OpenDoc } from 'rxq/_cjs/Global';
import { switchMap, shareReplay } from 'rxjs/operators';

export default ['$scope', '$element', function($scope, $element) {
  const config = {
    host: '172.16.84.102/app/engineData',
    isSecure: true
  }

  const session = connectSession(config)
  const global$ = session.global$

  const engVer$ = global$.pipe(
    switchMap(h => h.ask(EngineVersion))
  )

  const app$ = connectSession({
    host: '172.16.84.102',
    isSecure: true,
    appname: 'ba6727a1-dd52-43e1-a78d-5975a4c9e6ee'
  }).global$.pipe(
    switchMap(h => h.ask(OpenDoc, 'ba6727a1-dd52-43e1-a78d-5975a4c9e6ee')),
    shareReplay(1)
  )

  app$.subscribe(console.log)

  engVer$.subscribe(console.log)
}]