import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

var context = require.context('./test', true, /-test\.js$/);
context.keys().forEach(context);
