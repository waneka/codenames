defmodule Codenames.GameSupervisor do
  use Supervisor

  def find_or_create(room) do
    case Codenames.GameSupervisor.start_child(room) do
      {:ok, pid} -> {:ok, pid}
      {:error, {:already_started, pid}} -> {:ok, pid}
    end
  end

  def start_link do
    Supervisor.start_link(__MODULE__, [], name: :game_supervisor)
  end

  def start_child(room) do
    Supervisor.start_child(:game_supervisor, [room])
  end

  def stop do
    Supervisor.stop(:game_supervisor)
  end

  def init(_) do
    children = [
      worker(Codenames.Game, [], restart: :transient)
    ]

    supervise(children, strategy: :simple_one_for_one)
  end
end
