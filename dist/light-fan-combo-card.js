class LightFanComboCard extends HTMLElement {
    set hass(hass) {
        if (!this.content) {
            // Init card
            this.innerHTML = `<ha-card header="Light Fan Combo Card"><div class="card-content"></div></ha-card>`;
            this.content = this.querySelector('div');
        }   

        const fanEntity = this.config.fan_entity;
        const fanState = hass.states[fanEntity];
        const lightEntity = this.config.light_entity;
        const lightState = hass.states[lightEntity];

        this.content.innerHTML = `<div class="light-button">Light ${lightEntity}</div><div class="fan_button">Fan ${fanEntity}</div>
                                  <div class="fan-speeds">High Med Low</div>`;
    }

    setConfig(config) {
        if (!config.fan_entity || !config.light_entity) {
            throw new Error('Both fan_entity and light_entity need to be set.');
        }

        this.config = config;
    }

    getCardSize() {
        return 3;
    }

    setSpeed(speed) {
        let newSpeed = "low";
        switch (speed) {
            case 0:
                newSpeed = "low";
                break;
            case 1:
                newSpeed = "medium";
                break;
            case 2:
                newSpeed = "high";
                break;
        }

        hass.callService("fan", "set_speed", {
            entity_id: this.config.fan_entity,
            speed: newSpeed
        });
    }
}

customElements.define('light-fan-combo', LightFanComboCard);