<template>
    <div>
        <v-time-picker
            v-model="picker"
            :min="min"
            :landscape="landscape"
            full-width
            format="24hr"
            :dark="true"
            color="blue lighten-1"
        ></v-time-picker>
    </div>
</template>

<script>
const countdownNext = nodecg.Replicant('countdownNext');
export default {
    data () {
        return {
            landscape: true,
            min: this.getMinTime(),
            picker: this.getMinTime().split(' ')[0]
        }
    },
    created() {
        document.addEventListener('dialog-opened', () => {
            this.min = this.getMinTime();

            this.picker = this.getMinTime().split(' ')[0];
        });
        document.addEventListener('dialog-confirmed', () => {
            var time = this.picker.split(':');
            var d = new Date(); // creates a Date Object using the clients current time
            d.setHours  (+time[0]); // set Time accordingly, using implicit type coercion
            d.setMinutes(time[1]); // you can pass Number or String, it doesn't matter
            d.setSeconds(0);
            
            let duration = this.setEnd(d.getTime() / 1000);
            
            countdownNext.value = duration;

            nodecg.sendMessage('startCountdown', duration);
        });
    },
    methods: {
        getMinTime: () => {
            let d = new Date;
            d.setMinutes(d.getMinutes() + 1);
            return d.toTimeString();
        },
        setEnd: (ts) => {
            const timeDiff = Math.max(ts - ((new Date).getTime() / 1000), 0);
            return timeDiff;
        }
    }
};
</script>