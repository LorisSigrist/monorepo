<script>
    /** @type {'button' | 'submit' | 'reset'} */
    export let type = 'button';

    export let disabled = false;

    /**
     * @typedef {'idle' | 'disabled'} State
     */


    /** @type {Record<State, string>} */
    const STATE_STYLES = {
        idle: 'rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        disabled: 'rounded-md bg-gray-100 px-2.5 py-1.5 text-sm font-semibold text-gray-500 cursor-not-allowed',
    }

    /** @type {State} */
    $: state = disabled ? 'disabled' : 'idle';
</script>

<button 
    type={type}
    disabled={disabled}
    class={STATE_STYLES[state]}
    {...$$restProps}
>
    <slot/>
</button>