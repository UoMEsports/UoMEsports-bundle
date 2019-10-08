import {NodeCG} from '../../../../types/server';
import * as nodecgApiContext from './util/nodecg-api-context';

export = (nodecg: NodeCG): void => {
    nodecgApiContext.set(nodecg);

    require('./countdown');
};
