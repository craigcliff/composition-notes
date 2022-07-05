<template>
    <div class="notes">
        <div class="card has-background-dark p-4 mb-5">
            <div class="field">
                <div class="control">
                   <textarea
                     class="textarea"
                     placeholder="Add a new note"
                   />
                </div>
            </div>
            <div class="field is-grouped is-grouped-right">
                <div class="control">
                    <button class="button is-link has-background-success">
                        Add new Note
                    </button>
                </div>
            </div>
        </div>
        <div
            v-for="i in 3"
            class="card mb-4"
        >
            <div class="card-content">
                <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br>
                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item">Edit</a>
                <a href="#" class="card-footer-item">Delete</a>
            </footer>     
        </div>
    </div>
</template>