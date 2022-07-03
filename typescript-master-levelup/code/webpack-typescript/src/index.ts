const scott: string = 'rad';

document.addEventListener('DOMContentLoaded', () => {
    const pluginsTriggerElement = document.getElementById('plugins-trigger');
    const pluginsElement = document.getElementById('plugins');

    const pluginsVisibleClass = 'splash-overview-plugins__list--visible';

    pluginsTriggerElement.onclick = () => {
        pluginsElement.classList.toggle(pluginsVisibleClass);
    };
});
