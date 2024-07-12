import './css/Main.css'
import Header from './sub/Header';
import Nav from './sub/Nav';
import Footer from './sub/Footer';

export default function ReactLayout() {
    const titleText = 'My React SPA Website'
    const menus = ['Javascript', 'Typescript', 'React'];
    const footerText = 'Copyright (c) 2024 All right reserved OrKaNonS';
    return (
        <div id = 'wrapper'>
            <Header titleText={titleText} />
            <Nav menus={menus} />
            <Footer footerText={footerText} />
        </div>
    );
}