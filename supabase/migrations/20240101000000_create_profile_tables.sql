-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text,
  role text,
  location text,
  domain text,
  avatar_url text,
  email text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create skills table
create table public.skills (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles on delete cascade not null,
  name text not null,
  created_at timestamptz default now()
);

-- Create interests table
create table public.interests (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles on delete cascade not null,
  name text not null,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.skills enable row level security;
alter table public.interests enable row level security;

-- Create policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can view their own skills"
  on public.skills for select
  using (auth.uid() = profile_id);

create policy "Users can manage their own skills"
  on public.skills for all
  using (auth.uid() = profile_id);

create policy "Users can view their own interests"
  on public.interests for select
  using (auth.uid() = profile_id);

create policy "Users can manage their own interests"
  on public.interests for all
  using (auth.uid() = profile_id);

-- Create function to handle profile updates
create or replace function public.handle_profile_update()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for profile updates
create trigger on_profile_update
  before update on public.profiles
  for each row
  execute function public.handle_profile_update();