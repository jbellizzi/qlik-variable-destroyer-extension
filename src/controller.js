import { connectSession } from 'rxq'
import { EngineVersion, OpenDoc } from 'rxq/_cjs/Global';
import { switchMap, shareReplay } from 'rxjs/operators';
import serverConfig from './server-config.json';

export default function(qlik) {
  return ['$scope', '$element', function($scope, $element) {
    const currAppId = qlik.currApp().id
  
    const app$ = connectSession({
      ...serverConfig,
      appname: currAppId
    }).global$.pipe(
      switchMap(h => h.ask(OpenDoc, currAppId)),
      shareReplay(1)
    )
  
    app$.subscribe(console.log)
  
  }]
}