// Warm the mechanics/description resources without blocking the wiki UI.
(function () {
    'use strict';

    const warm = (urls) => Promise.allSettled(urls.map(url =>
        fetch(url, { cache: 'force-cache' }).catch(() => null)
    ));

    // These are on the critical path for the first English ability/passive description.
    warm([
        'skillunit.js',
        'mechanics.js',
        'data/mechanics.json',
        'data/mechanics_localisation.json'
    ]);

    // Warm the larger description/apply-tag datasets when the browser has breathing room.
    const warmSecondary = () => warm([
        'data/abilities_description.json',
        'data/passives_description.json',
        'data/abilities_description_localisation.json',
        'data/passives_description_localisation.json',
        'data/apply_tags.json',
        'data/apply_tags_abilities_0.json',
        'data/apply_tags_abilities_1.json',
        'data/apply_tags_abilities_2.json',
        'data/apply_tags_abilities_3.json',
        'data/apply_tags_abilities_4.json',
        'data/apply_tags_passives.json'
    ]);

    if ('requestIdleCallback' in window) {
        requestIdleCallback(warmSecondary, { timeout: 1000 });
    } else {
        setTimeout(warmSecondary, 250);
    }
})();
